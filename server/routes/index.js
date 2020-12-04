'use strict'

const router = require('express').Router()
const indexController = require('../controller')

/** 
 * @route   GET tests
 * @desc    Handles get requests to tests
 * @access  Public
 */
router.get('/test', indexController.test)

// Exports
module.exports = router