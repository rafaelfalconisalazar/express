'use strict'
const Product = require('../models/product')
const Provider = require('../models/provider')

function getProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
        if (!product) return res.status(404).send({ message: "el producto no existe" })
        res.status(200).send({ product })

    })
}

function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
        if (!products) return res.status(404).send({ message: "No existen productos" })
        res.status(200).send({ products })
    })
}

function getProductsByProvider(req,res){
    let providerId = req.params.providerId
    Product.find({ tags: { $all : [providerId] } },(err,products)=>{
        if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
        if (!products) return res.status(404).send({ message: "No existen productos con ese provedor" })
        res.status(200).send({ products })  
    })
   
}

function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
        res.status(200).send({ product: productUpdate })
    })
}
function deleteProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion ${err}` })
        if (!product) return res.status(404).send({ message: "el producto no existe" })
        product.remove(err => {
            if (err) res.status(500).send({ message: `Error ${err}` })
            res.status(200).send({ message: "el producto a sido eliminado" })
        })

    })
}

function createProduct(req, res) {

    let product = new Product()
    let providersBody =req.body.provider
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.pricey
    product.category = req.body.category
    product.description = req.body.description
    let providers = []
    providersBody.forEach(function(providerBody) {
        let provider = new Provider()
        provider.name=providerBody.name;
        provider.address=providerBody.address;
        providers.push(provider)
        provider.save((err, providerStores) => { })
      });
      
    
    product.provider = providers   

    product.save((err, producStored) => {
        if (err) res.status(500).send({ message: `error al crear el producto ${err}` })
        res.status(200).send({ message: `${producStored}` });
    })
    
}

module.exports = {
    getProduct,
    getProducts,
    getProductsByProvider,
    updateProduct,
    deleteProduct,
    createProduct
}