'use strict'

const mysql = require('mysql')
// require('dotenv').config()

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "all-unsigned",
	port: 8889,
})

connection.connect()

// Exports
module.exports = connection