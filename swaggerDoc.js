const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const config = require('./src/config/config');
const { swaggerHost } = config[process.env.NODE_ENV || 'development'];

const router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Mina's plusdoctor_API",
      version: '1.0.0',
      description: '',
    },
    host: swaggerHost,
    basePath: '/',
    // securityDefinitions: {
    //   bearerAuth: {
    //     type: 'apiKey',
    //     name: 'Authorization',
    //     scheme: 'bearer',
    //     in: 'header',
    //   },
    // },
  },
  apis: ['src/routes/*.js', 'src/entities/*.js'],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
router.use(swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
