const Sequelize = require('sequelize')
const db = require('../db')

const PlantGarden = db.define('PlantGarden', {
  plantDate: {
    type: Sequelize.DATE
  }
})

module.exports = PlantGarden;