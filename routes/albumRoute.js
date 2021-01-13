"use strict";

const router = require("express").Router();
const albumController = require("../controllers/albumController");


/* GET requests
=================================================================================== */

/**
 * @route   GET albums
 * @desc    Displays the albums
 * @access  Public
 */
router.get("/", albumController.index);

/**
 * @route   GET album
 * @desc    Gets the specific album type
 * @access  Public
 */
router.get("/type", albumController.type);

/**
 * @route   GET songs
 * @desc    Displays all of the songs
 * @access  Public
 */
router.get("/songs/:id", albumController.getAllSongs);

/**
 * @route   GET song
 * @desc    Displays a specific song
 * @access  Public
 */
router.get("/getonesong/:id", albumController.getOneSong);

/**
 * @route   GET topAlbums
 * @desc    Gets the most liked bands from the database
 * @access  Public
 */
router.get("/topalbums", albumController.getTopAlbums);

/**
 * @route   GET album
 * @desc    Gets a specific album in the database
 * @access  Public
 */
router.get("/getalbum/:id", albumController.getSpecificAlbum);

/**
 * @route   GET album
 * @desc    Gets the total amount of albums
 * @access  Public
 */
router.get("/getnumberofalbums/", albumController.getNumberOfAlbums);

/**
 * @route   GET album
 * @desc    Checks a specific album in the database
 * @access  Public
 */
router.get("/:id", albumController.checkSpecificAlbum);

/* POST requests
=================================================================================== */

/**
 * @route   POST album
 * @desc    Creates an album and adds it to the database
 * @access  Public
 */
router.post("/add", albumController.create);


/**
 * @route   POST song
 * @desc    Creates a specific song and adds it to the database
 * @access  Public
 */
router.post("/songs/add", albumController.createSong);

/**
 * @route   POST album
 * @desc    Adds a "like" to a specific band
 * @access  Public
 */
router.post("/favourite/:id", albumController.favorite);

/* PUT requests
=================================================================================== */

/**
 * @route   PUT album
 * @desc    Edits an album in the database
 * @access  Public
 */
router.post("/edit/:id", albumController.edit);

/**
 * @route   PUT song
 * @desc    Edits a song in the database
 * @access  Public
 */
router.post("/songs/edit/:id", albumController.editSong);


/* DELETE requests
=================================================================================== */

/**
 * @route   DELETE album
 * @desc    Deletes an album from the database
 * @access  Public
 */
router.delete("/delete/:id", albumController.delete);

/**
 * @route   DELETE song in album
 * @desc    Deletes a song from the database
 * @access  Public
 */
router.delete("/song/delete/:id", albumController.deleteSong);

// Exports
module.exports = router;