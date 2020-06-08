const express = require('express');
const route = express.Router();
const joinController = require('../controllers/join');

//hospital 회원가입 api 경로
route.post('/hospital', joinController.hospital);

//user 회원가입 api 경로
route.post('/user', joinController.user);

module.exports = route;

/**
 * @swagger
* /join/hospital:
 *  post:
 *      tags:
 *          - join
 *      name: /join/hospital
 *      summary: join hospital
 *      parameters:
 *        - name: hospitalData
 *          in: body 
 *          type:
 *              - $ref: "#/definitions/hospitalJoinData"
 *          example: {
	            "username": "user",
	            "password": "0000",
	            "title": "A병원",
	            "phone": "011-111-1111",
                "address":"서울",
                "operation_time":"07~21;07~21;07~21;07~21;07~21;07~21;07~21"
            }
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: scent created
 *              schema:
 *                  itemps:
 *                      type: object
 *                  example: {
                        "result": "회원가입성공"
                    }

 */

// Definitions 입니다
/**
 *  @swagger
 *  definitions:
 *      hospitalJoinData:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  example: "myusername"
 *              password:
 *                  type: string
 *                  example: 32
 *              title:
 *                  type: string
 *                  example: "C병원"
 *              phone:
 *                  type: string
 *                  example: "010-1231-1111"
 *              address:
 *                  type: string
 *                  example: "경기도 남양주시"
 *              operation_time:
 *                  type: string
 *                  example: "07~21;07~21;07~21;07~21;07~21;07~21;07~21"
 
 */
