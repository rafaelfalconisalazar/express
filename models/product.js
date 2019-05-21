'use stric'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Provider = require('./provider').schema

const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['computers', 'phones', 'accesories'] },
    description: String,
    provider: [Provider]
})

module.exports = mongoose.model('Product', ProductSchema)
