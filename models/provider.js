'use stric'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProviderSchema = Schema({
    name: String,
    address: String
})

module.exports = mongoose.model('Provider', ProviderSchema)
