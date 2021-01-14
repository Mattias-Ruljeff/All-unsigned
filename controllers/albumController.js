"use strict";

// Connect to mysql
const connection = require("../configs/database");
const albumController = {};

/* Album Controllers
=================================================================================== */
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
        const editAlbumQuery = `UPDATE album SET name = "${req.body.name}", genre = "${req.body.genre}", release_date = "${req.body.release_date.substring(0,10) + " 11:00:00"}" WHERE id = "${req.params.id}"`
        connection.query(editAlbumQuery);

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
        const deleteSpecificAlbumQuery = `DELETE FROM album WHERE id = "${req.params.id}"`
        connection.query(deleteSpecificAlbumQuery);

        res.status(200);
        res.json({
            msg: "Album was deleted",
        });

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
        const getSpecificAlbumQuery = `SELECT * FROM album WHERE id = "${req.params.id}"`

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

albumController.favorite = async (req, res) => {
    try {
        const updateAlbumFavoriteCounterQuery = `UPDATE album SET favorite = favorite + 1 WHERE id = "${req.params.id}"`
        connection.query(updateAlbumFavoriteCounterQuery);

        res.status(200);
        res.json({
            msg: "Album was favorited",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.getTopAlbums = async (req, res) => {
    try {
        const getTopAlbumsQuery = 'SELECT band.name AS band, album.name AS album, album_type.type AS type, album.genre AS genre FROM album LEFT JOIN band ON album.band_id = band.id LEFT JOIN album_type ON album.album_type_id = album_type.id ORDER BY album.favorite DESC LIMIT 10'

        await connection.query(getTopAlbumsQuery,
            (error, result, fields) => {
            if (error) {
                throw error
            }
            
            res.status(200)
            res.json({
                msg: 'Fetching top five albums',
                result
            })
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.getNumberOfAlbums = async (req, res) => {
    try {
        const getNumberOfRecordsQuery = 'SELECT COUNT(album.id) AS No, album_type.type AS Type FROM album LEFT JOIN album_type ON album.album_type_id = album_type.id GROUP BY album.album_type_id'

        await connection.query(getNumberOfRecordsQuery,
            (error, result, fields) => {
            if (error) {
                throw error
            }
            
            res.status(200)
            res.json({
                msg: 'Fetching total amounts of albums',
                result
            })
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

/* Song Controllers
=================================================================================== */
albumController.createSong = async (req, res) => {
    try {
        const { name, length, albumId } = req.body
        await connection.query(`INSERT INTO song(name, length, album_id) VALUES("${name}","${length}", "${albumId}")`);

        res.status(200);
        res.json({
            msg: "Song was added",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.deleteSong = async (req, res) => {
    try {
        const deleteSpecificSongQuery = `DELETE FROM song WHERE id = "${req.params.id}"`
        connection.query(deleteSpecificSongQuery);

        res.status(200);
        res.json({
            msg: "Song was deleted",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.getOneSong = async (req, res) => {
    try {
        const getAllSongsQuery = `SELECT * FROM song WHERE id = "${req.params.id}"`

        await connection.query(getAllSongsQuery,
        (error, result, fields) => {
            if (error) {
                throw error
            }

            res.status(200)
            res.json({
                msg: 'Fetching one song',
                result
            })
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

albumController.getAllSongs = async (req, res) => {
    try {
        const getAllSongsQuery = `SELECT * FROM song WHERE album_id = "${req.params.id}"`

        await connection.query(getAllSongsQuery,
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

albumController.editSong = async (req, res) => {
    try {
        const editAlbumQuery = `UPDATE song SET name = "${req.body.name}", length = "${req.body.length}" WHERE id = "${req.params.id}"`
        connection.query(editAlbumQuery);

        res.status(200);
        res.json({
            msg: "Album was updated",
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Error: " + error });
    }
};

// Exports
module.exports = albumController;