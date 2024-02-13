const express = require('express')
const app = express()

const router = require('./routes');
const cors = require('cors');
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())
app.use('/', router)

module.exports = app