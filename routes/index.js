'use strict'

const router = require('express').Router()
const indexController = require('../controller')

/** 
 * @route   GET bands
 * @desc    Handles get requests to tests
 * @access  Public
 */
router.get('/', indexController.index)

/** 
 * @route   POST bands
 * @desc    Handles post requests to tests
 * @access  Public
 */
router.post('/add', indexController.create)

// Exports
module.exports = router