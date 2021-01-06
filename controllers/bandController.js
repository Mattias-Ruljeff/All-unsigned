"use strict";

// Connect to mysql
const connection = require("../configs/database");

const bandController = {};

bandController.index = async (req, res) => {
    try {
        const selectAllBandsQuery = 'SELECT * FROM band'

        await connection.query(selectAllBandsQuery,
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

bandController.create = async (req, res) => {
    try {
        // const createBandQuery = `INSERT INTO band(name) VALUES("${req.body.name}")`
        connection.query(`INSERT INTO band(name) VALUES("${req.body.name}")`);

        res.status(200);
        res.json({
            msg: "Band was created",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.edit = async (req, res) => {
    try {
        // const editBandQuery = `UPDATE band SET name WHERE id = "${req.body.name}"`
        connection.query(`UPDATE band SET name WHERE id = "${req.body.name}"`);

        res.status(200);
        res.json({
            msg: "Band was updated",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.delete = async (req, res) => {
    try {
        // const deleteSpecificBandQuery = `DELETE FROM band WHERE id = "${req.params.id}"`
        connection.query(`DELETE FROM band WHERE id = "${req.params.id}"`);

        res.status(200);
        res.json({
            msg: "The band was deleted",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.checkSpecificBand = async (req, res) => {
    try {
        const checkSpecificBandQuery = `SELECT name FROM band WHERE name = "${req.params.id}"`

        await connection.query(checkSpecificBandQuery,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            if (Object.keys(result).length === 0) {
                res.status(200)
                res.json({
                    msg: "Band name is availiable",
                    uniqueBand : true
                })
                
            } else {
                res.json({
                    msg: 'Band name is not availiable',
                    uniqueBand : false
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.getSpecificBand = async (req, res) => {
    try {
        const getSpecificBandQuery = `SELECT * FROM band WHERE id = "${req.params.id}"`

        await connection.query(getSpecificBandQuery,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            if (Object.keys(result).length === 0) {
                res.status(404).json({
                    msg: 'The band was not found',
                    uniqueBand : false
                })
            } else {
                res.status(200)
                res.json({
                    msg: "The band was found",
                    result
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.favourite = async (req, res) => {
    try {
        // const favouriteBandQuery = `UPDATE band SET favourite = favourite + 1 WHERE id = "${req.params.id}"`
        connection.query(`UPDATE band SET favourite = favourite + 1 WHERE id = "${req.params.id}"`);

        res.status(200);
        res.json({
            msg: "Band was favorited",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.getTopBands = async (req, res) => {
    try {
        await connection.query('CREATE OR REPLACE VIEW topbands AS SELECT name FROM band ORDER BY band.favourite DESC LIMIT 10',
            (error, result, fields) => {
            if (error) {
                throw error
            }
        })

        const getTopFiveBandsQuery = 'SELECT * FROM topbands'

        await connection.query(getTopFiveBandsQuery,
            (error, result, fields) => {
            if (error) {
                throw error
            }
            
            res.status(200)
            res.json({
                msg: 'Fetching top ten bands',
                result
            })

        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

bandController.totalNumberOfBands = async (req, res) => {
    try {
        // const favouriteBandQuery = `UPDATE band SET favourite = favourite + 1 WHERE id = "${req.params.id}"`
        connection.query('SELECT COUNT(band.id) AS No FROM band',
        (error, result, fields) => {
            if (error) {
                throw error
            }

            res.status(200);
            res.json({
                msg: "Total number of bands was counted",
                result
            });

        })


    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

// Exports
module.exports = bandController;