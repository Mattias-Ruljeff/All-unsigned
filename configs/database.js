"use strict";

const mysql = require("mysql");
require("dotenv").config();
let connection;

if (process.env.NODE_ENV === "production") {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  connection.connect();
} else {
  connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
  });
  connection.connect();
}

// Exports
module.exports = connection;
