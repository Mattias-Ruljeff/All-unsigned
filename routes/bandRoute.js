"use strict";

const router = require("express").Router();
const bandController = require("../controllers/bandController");

/**
 * @route   GET bands
 * @desc    Displays the bands
 * @access  Public
 */
router.get("/", bandController.index);

/**
 * @route   POST bands
 * @desc    Creates a band and adds it to the database
 * @access  Public
 */
router.post("/add", bandController.create);

/**
 * @route   POST band
 * @desc    Edits a band in the database
 * @access  Public
 */
router.post("/edit/:id", bandController.edit);

/**
 * @route   DELETE band
 * @desc    Deletes a band from the database
 * @access  Public
 */
router.delete("/delete/:id", bandController.delete);

/**
 * @route   GET band
 * @desc    Checks a specific band in the database
 * @access  Public
 */
router.get("/:id", bandController.checkSpecificBand);

/**
 * @route   GET band
 * @desc    Gets a specific band in the database
 * @access  Public
 */
router.get("/getband/:id", bandController.getSpecificBand);


// Exports
module.exports = router;