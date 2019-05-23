'use strict'
/**
 * importación de librerías
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/api', api);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app