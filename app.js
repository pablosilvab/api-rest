// Funcionalidad Express
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes') // No indico el nombre porque se llama index.js

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Configuar motor de plantillas Express
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use('/api', api)
app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/', (req, res) => {
  res.render('product')
})

module.exports = app
