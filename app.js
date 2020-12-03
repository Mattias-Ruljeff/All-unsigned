'use strict'

// mysql://u0m8q26saxpw7fas:fdeq4xgo9td8xgfg@vlvlnl1grfzh34vj.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/ae9ooyn3a7l6crp4

// username = u0m8q26saxpw7fas
// password = fdeq4xgo9td8xgfg
// port = 3306
// dbname = ae9ooyn3a7l6crp4


let url = getenv('JAWSDB_URL');
let dbparts = parse_url(url);

let hostname = dbparts['host'];
let username = dbparts['user'];
let password = dbparts['pass'];
let database = ltrim(dbparts['path'],'/');

$productionConn = mysqli_connect(hostname, username, password, database);


const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "reddit-database",
	port: 8889,
	charset: "utf8mb4",
});

connection.connect();