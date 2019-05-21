'use strict'
/**
 * importación de librerías
 */
const express = require('express')
const productController=require('../controller/product')
const api = express.Router()

api.post('/v1/product', productController.createProduct)

api.get('/v1/product', productController.getProducts)

api.get('/v1/product/:productId', productController.getProduct);

api.delete('/v1/product/:productId', productController.deleteProduct );

api.put('/v1/product/:productId', productController.updateProduct);

module.exports=api