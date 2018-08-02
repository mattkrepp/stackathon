const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('Plant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  //Simulating an array using JSON parse/stringify in getter/setter methods
  schedule: {
    type: Sequelize.TEXT,
    get: function () {
      return JSON.parse(this.getDataValue('schedule'))
    },
    set: function (arr) {
      return this.setDataValue('schedule', JSON.stringify(arr))
    }
  },
  season: {
    type: Sequelize.TEXT,
    get: function () {
      return JSON.parse(this.getDataValue('season'))
    },
    set: function (arr) {
      return this.setDataValue('season', JSON.stringify(arr))
    }
  },
  yield: {
    type: Sequelize.DECIMAL
  },
  daysToHarvest: {
    type: Sequelize.INTEGER
  },
  //Fields below will be used to store coordinates for potential GUI rollout
  bottomLeft: {
    type: Sequelize.INTEGER
  },
  topRight: {
    type: Sequelize.INTEGER
  }
})

module.exports = Plant;