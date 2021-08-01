const express = require('express')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const routes = require('./routes')
const properties = require('./config/properties')
const DB = require('./config/connection')

DB()

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use( function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Content Api',
            description: 'Content Api Information',
            contact: {
                name: 'Amazing'
            },
        }
    },
    apis: ['app.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
routes(router)
app.use(router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  
/**
 * @swagger
 * /users:
 *  post:
 *      description: Create user
 *      tags: ['Create User']
 *      parameters:
 *      - name: id
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      - name: name
 *        description: Name of person
 *        in: formData
 *        required: true
 *        type: string
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /users/:id:
 *  put:
 *      description: Update user
 *      tags: ['Update User']
 *      parameters:
 *      - name: id
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      - name: name
 *        description: Name of person what do you change
 *        required: true
 *        type: string
 *        in: formData
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /users/:id:
 *  delete:
 *      description: Delete user
 *      tags: ['Delete User']
 *      parameters:
 *      - name: id
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /users/:id/active:
 *  patch:
 *      description: Active acount user
 *      tags: ['Active User']
 *      parameters:
 *      - name: id
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /users/:id:
 *  post:
 *      description: Obtain information is active user
 *      tags: ['User is active']
 *      parameters:
 *      - name: id
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /authorization:
 *  post:
 *      description: Obtain of token
 *      tags: ['Token']
 *      parameters:
 *      - name: id
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /authorization:
 *  delete:
 *      description: Delete of token
 *      tags: ['Delete token']
 *      parameters:
 *      - name: id
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      responses: 
 *          200:
 *              description: Success
 * 
 */
/**
 * @swagger
 * /messages/send:
 *  post:
 *      description: Send a message
 *      tags: ['Send message to people connecting']
 *      parameters:
 *      - name: id
 *        description: Id of person have to be unique
 *        in: formData
 *        required: true
 *        type: number
 *      - name: message
 *        description: Message to send
 *        in: formData
 *        required: true
 *        type: string
 *      responses: 
 *          200:
 *              description: Success
 * 
 */

app.listen(properties.PORT, () => {
    console.log(`Server on running on port ${properties.PORT}`)
})
