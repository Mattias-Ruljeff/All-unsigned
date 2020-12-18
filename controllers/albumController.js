"use strict";

// Connect to mysql
const connection = require("../configs/database");

const albumController = {};

albumController.index = async (req, res) => {
    try {
        const selectAllAlbumsQuery = 'SELECT * FROM album'

        await connection.query(selectAllAlbumsQuery,
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

albumController.create = async (req, res) => {
    try {
        const { id, name, type, genre, date } = req.body
        const createAlbumQuery = `INSERT INTO album(name, band_id, genre, album_type_id, release_date) VALUES("${name}","${id}","${genre}", "${type}", "${date}")`
        await connection.query(createAlbumQuery)

        // await connection.query(`INSERT INTO album(name, band_id, genre, album_type_id, release_date) VALUES("${name}","${id}","${genre}", "${type}", "${date}")`);

        res.status(200);
        res.json({
            msg: "Album was created",
        });
            
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.edit = async (req, res) => {
    try {
        // const editAlbumQuery = `UPDATE band SET name WHERE id = "${req.body.name}"`
        connection.query(`UPDATE band SET name WHERE id = "${req.body.name}"`);

        res.status(200);
        res.json({
            msg: "Album was updated",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.delete = async (req, res) => {
    try {
        // const deleteSpecificAlbumQuery = `DELETE FROM band WHERE id = "${req.params.id}"`
        connection.query(`DELETE FROM band WHERE id = "${req.params.id}"`);

        res.status(200);
        res.json({
            msg: "Album was deleted",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.getAllSongs = async (req, res) => {
    try {
        const selectAllSongsQuery = 'SELECT * FROM song'

        await connection.query(selectAllSongsQuery,
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
        const getSpecificAlbumTypeQuery = 'SELECT * FROM album_type'

        await connection.query(getSpecificAlbumTypeQuery,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            res.status(200)
            res.json({
                msg: 'Fetching the album type',
                result
            })

        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.createSong = async (req, res) => {
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
            msg: "Song was added",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.checkSpecificAlbum = async (req, res) => {
    try {
        const checkSpecificAlbumQuery = `SELECT name FROM band WHERE name = "${req.params.id}"`

        await connection.query(checkSpecificAlbumQuery,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            if (Object.keys(result).length === 0) {
                res.status(200)
                res.json({
                    msg: "Album name is not availiable",
                    uniqueAlbum : true
                })

            } else {
                res.json({
                    msg: 'Album name is availiable',
                    uniqueAlbum : false
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.getSpecificAlbum = async (req, res) => {
    try {
        const getSpecificAlbumQuery = `SELECT * FROM band WHERE id = "${req.params.id}"`

        await connection.query(getSpecificAlbumQuery,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            if (Object.keys(result).length === 0) {
                res.status(404).json({
                    msg: 'The album was not found',
                    uniqueBand : false
                })
            } else {
                res.status(200)
                res.json({
                    msg: "The album was found",
                    result
                })
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

// Exports
module.exports = albumController;