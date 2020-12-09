"use strict";

// Connect to mysql
const connection = require("../configs/database");

const indexController = {};

indexController.index = async (req, res) => {
  console.log("at index");
};
indexController.bands = async (req, res) => {
  try {
    console.log(req.body);
    await connection.query("SELECT * FROM band", (error, result, fields) => {
      if (error) {
        throw error;
      }
      console.log(result.body);

      res.status(200);
      res.json({
        result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error: " + error });
  }
};

indexController.create = async (req, res) => {
  try {
    // connection.query('INSERT INTO band(name) VALUES("")')
    connection.query(`INSERT INTO band(name) VALUES("${req.body.name}")`);

    res.status(200);
    res.json({
      msg: "Query was added.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error: " + error });
  }
};

// Exports
module.exports = indexController;
