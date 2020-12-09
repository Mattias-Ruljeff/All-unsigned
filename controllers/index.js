"use strict";

// Connect to mysql
const connection = require("../configs/database");

const indexController = {};

indexController.bands = async (req, res) => {
  try {

    const queryBands = 'SELECT * FROM band'

    await connection.query(queryBands,
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

indexController.checkBandInDb = async (req, res) => {
  try {
    const querySpecificBand = `SELECT name FROM band WHERE name = "${req.params.id}"`
    await connection.query(querySpecificBand,
      (error, result, fields) => {
        if (error) {
          throw error
        }
        
        if (Object.keys(result).length === 0) {
          res.status(200)
          res.json({msg: "Band name not taken", uniqueBand : true})
        } else {
          res.json({
            msg: 'Band name is taken',
            uniqueBand : false
          })
        }
        

      }
    )

  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error: " + error });
  }
};


indexController.create = async (req, res) => {
  try {
    connection.query(`INSERT INTO band(name) VALUES("${req.body.name}")`);

    res.status(200);
    res.json({
      msg: "Band was added.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error: " + error });
  }
};

// Exports
module.exports = indexController;
