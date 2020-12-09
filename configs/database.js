"use strict";

const mysql = require("mysql");
let connection;

if (process.env.NODE_ENV === "production") {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  // connection.connect();
} else {
  connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
  });

}

connection.connect((error) => {
    if (error) {
        console.log(erroro.message)
    }
})

// Exports
module.exports = connection;
