const router = require('express').Router()
const {Plant} = require('../db/models')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll()
    res.json(plants)
  } catch (err) {
    next(err)
  }
})