"use strict";

// Connect to mysql
const connection = require("../configs/database");

const indexController = {};

indexController.bands = async (req, res) => {
  try {

    const queryBeers = 'SELECT * FROM band'

    await connection.query(queryBeers,
      (error, result, fields) => {
        if (error) {
            throw error
        }

        res.status(200)
        res.json({
            msg: 'Fetching all bands',
            result
        })

      }
    )

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
