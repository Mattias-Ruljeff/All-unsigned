'use strict'

// Connect to mysql
const connection = require('../configs/database')

const indexController = {}

indexController.test = async (req, res) => {
    try {
        console.log('Hello World!')

        connection.query('INSERT INTO test(name, genre, albums) VALUES("Rullez", "Dansband", "En Fika I Resby")')

        res.status(200)
        res.json({
            msg: 'Query was added.'
        })
  
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Error: ' + error })
    }
}

// Exports
module.exports = indexController