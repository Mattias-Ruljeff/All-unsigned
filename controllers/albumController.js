"use strict";

// Connect to mysql
const connection = require("../configs/database");

const albumController = {};

albumController.albums = async (req, res) => {
    try {
        const queryBands = 'SELECT * FROM album'

        await connection.query(queryBands,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            res.status(200)
            res.json({
                msg: 'Fetching all albums',
                result
            })

        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.getSongs = async (req, res) => {
    try {
        const queryBands = 'SELECT * FROM song'

        await connection.query(queryBands,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            res.status(200)
            res.json({
                msg: 'Fetching all songs',
                result
            })

        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.type = async (req, res) => {
    try {
        const queryBands = 'SELECT * FROM album_type'

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

albumController.add = async (req, res) => {
    try {
        const { id, name, type, genre, date } = req.body
        const queryBands = `INSERT INTO album(name, band_id, genre, album_type_id, release_date) VALUES("${name}","${id}","${genre}", "${type}", "${date}")`
        await connection.query(queryBands)
        // await connection.query(`INSERT INTO album(name, band_id, genre, album_type_id, release_date) VALUES("${name}","${id}","${genre}", "${type}", "${date}")`);

        res.status(200);
        res.json({
            msg: "Band was added.",
        });
            
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.addSong = async (req, res) => {
    try {
        const { name, length, albumId, bandId } = req.body
        await connection.query(`INSERT INTO song(name, length, band_id, album_id) VALUES("${name}","${length}", "${bandId}", "${albumId}")`);

        const querySong = `SELECT id FROM song WHERE name = "${name}"`

        await connection.query(querySong,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            connection.query(`INSERT INTO tracklist(album_id, song_id) VALUES("${albumId}","${result[0].id}")`);

            // res.status(200)
            // res.json({
            //   msg: 'Fetching song id',
            //   result
            // })
        })

        res.status(200);
        res.json({
            msg: "Song was added.",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.editBand = async (req, res) => {
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

albumController.checkAlbumInDb = async (req, res) => {
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

albumController.getAlbumFromDb = async (req, res) => {
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

albumController.delete = async (req, res) => {
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
module.exports = albumController;