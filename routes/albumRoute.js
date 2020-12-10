"use strict";

const router = require("express").Router();
const albumController = require("../controllers/albumController");

/**
 * @route   GET bands
 * @desc    Handles get requests to tests
 * @access  Public
 */
router.get("/", albumController.albums);

/**
 * @route   GET bands
 * @desc    Handles get requests to tests
 * @access  Public
 */
router.get("/type", albumController.type);

/**
 * @route   GET bands
 * @desc    Handles get requests to tests
 * @access  Public
 */
router.get("/:id", albumController.checkAlbumInDb);
router.get("/getalbum/:id", albumController.getAlbumFromDb);

/**
 * @route   POST bands
 * @desc    Handles post requests to tests
 * @access  Public
 */
router.post("/add", albumController.add);
router.post("/edit/:id", albumController.editBand);

/**
 * @route   DELETE bands
 * @desc    Handles delete requests to tests
 * @access  Public
 */
router.delete("/delete/:id", albumController.delete);


// Exports
module.exports = router;
