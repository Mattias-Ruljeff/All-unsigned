'use strict'

const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')

// Create express application
const app = express()

// Additional middlewares
app.use(cors())
app.use(logger('dev')) // Request logger
app.use(express.json()) // Parses JSON

// Routes
app.use('/', require('./routes'))

// Set static folder.
app.use(express.static('client'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

// Start listening
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  console.log('Press Ctrl-C to terminate...')
})