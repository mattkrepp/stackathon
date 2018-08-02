const Sequelize = require('sequelize')
const db = require('../db')

const Garden = db.define('Garden', {
  width: {
    type: Sequelize.INTEGER
  },
  height: {
    type: Sequelize.INTEGER
  }
})

module.exports = Garden;