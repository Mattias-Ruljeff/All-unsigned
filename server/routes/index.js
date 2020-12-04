'use strict'

const router = require('express').Router()
const indexController = require('../controller')

/** 
 * @route   GET tests
 * @desc    Handles post requests to tests
 * @access  Public
 */
router.post('/test', indexController.test)

// Exports
module.exports = router