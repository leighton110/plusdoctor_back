const express = require('express');
const methodOverride = require('method-override');
const app = express();
const route = require('./routes');
const cors = require('cors');
const sequelize = require('./models').sequelize;

// sequelize.sync();
sequelize.sync({ force: true });
app.use(cors('*'));
app.use(express.json());
app.use(methodOverride());
app.use('/', route);

app.listen(4000, () => {
  console.log('server is running on 4000 port');
});
