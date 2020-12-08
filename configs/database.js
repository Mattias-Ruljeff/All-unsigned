"use strict";

const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

// const connection = mysql.createConnection(process.env.JAWSDB_URL)

connection.connect();

// Exports
module.exports = connection;
