'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

// Conexión a MongoDB
mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a BD: ${err}`)
    }
    console.log('Conexion a BD establecida')
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })

})
