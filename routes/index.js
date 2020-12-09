"use strict";

const router = require("express").Router();
const indexController = require("../controllers");

/**
 * @route   GET bands
 * @desc    Handles get requests to tests
 * @access  Public
 */
router.get("/bands", indexController.bands);

/**
 * @route   POST bands
 * @desc    Handles post requests to tests
 * @access  Public
 */
router.post("/add", indexController.create);

// Exports
module.exports = router;
