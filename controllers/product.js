'use strict'

const Product = require('../models/product')

// Obtener producto
function getProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la petición: ${err}`
        })
        if (!product) return res.status(404).send({
            message: `El producto no existe.`
        })
        res.status(200).send({
            product
        })
    })
}

// Obtener productos
function getProducts(req, res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({
            message: `Error al realizar la petición: ${err}`
        })
        if (!products) return res.status(404).send({
            message: `No existen productos.`
        })
        res.send(200, {
            products
        })
    })
}

// Almacenar producto
function saveProduct(req, res) {
    console.log('POST /api/product')
    console.log(req.body)

    //  Almacenar producto en BD
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    //  Salvar
    product.save((err, productStored) => {
        if (err) res.status(500).send({
            message: `Error al salvar en la BD: ${err}`
        })
        res.status(200).send({
            product: productStored
        })
    })
}


// Actualizar producto
function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body
    Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
        if (err) return res.status(500).send({
            message: `Error al actualizar el producto: ${err}`
        })
        //if (!product) return res.status(404).send({message: `El producto no existe.`})
        res.status(200).send({
            product: productUpdate
        })
    })
}

// Eliminar producto
function deleteProduct(req, res) {
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({
            message: `Error al borrar el producto: ${err}`
        })
        //if (!product) return res.status(404).send({message: `El producto no existe.`})
        product.remove(err => {
            if (err) return res.status(500).send({
                message: `Error al borrar el producto: ${err}`
            })
            res.status(200).send({
                message: 'El producto ha sido eliminado.'
            })
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}
