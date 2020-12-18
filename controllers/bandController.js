"use strict";

// Connect to mysql
const connection = require("../configs/database");

const bandController = {};

bandController.bands = async (req, res) => {
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

        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.addBand = async (req, res) => {
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

bandController.editBand = async (req, res) => {
    try {
        connection.query(`UPDATE band SET name WHERE id = "${req.body.name}"`);

        res.status(200);
        res.json({
            msg: "Band was edited.",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.checkBandInDb = async (req, res) => {
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
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.getBandFromDb = async (req, res) => {
    try {
        const querySpecificBand = `SELECT * FROM band WHERE id = "${req.params.id}"`
        await connection.query(querySpecificBand,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            if (Object.keys(result).length === 0) {
                res.status(404).json({
                    msg: 'Band not found',
                    uniqueBand : false
                })
            } else {
                res.status(200)
                res.json({msg: "Band found", result})
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.delete = async (req, res) => {
    try {
        connection.query(`DELETE FROM band WHERE id = "${req.params.id}"`);

        res.status(200);
        res.json({
            msg: "Band was deleted.",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

// Exports
module.exports = bandController;