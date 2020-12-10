"use strict";

const router = require("express").Router();
const bandController = require("../controllers/bandController");

/**
 * @route   GET bands
 * @desc    Handles get requests to tests
 * @access  Public
 */
router.get("/", bandController.bands);

/**
 * @route   GET bands
 * @desc    Handles get requests to tests
 * @access  Public
 */
router.get("/:id", bandController.checkBandInDb);
router.get("/getband/:id", bandController.getBandFromDb);

/**
 * @route   POST bands
 * @desc    Handles post requests to tests
 * @access  Public
 */
router.post("/add", bandController.addBand);
router.post("/edit/:id", bandController.editBand);

/**
 * @route   DELETE bands
 * @desc    Handles delete requests to tests
 * @access  Public
 */
router.delete("/delete/:id", bandController.delete);


// Exports
module.exports = router;
