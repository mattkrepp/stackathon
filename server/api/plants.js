const router = require('express').Router()
const {Plant, Garden, PlantGarden} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router


router.get('/:gardenId', async (req, res, next) => {
  try {
    const plants = await Plant.findAll({
      where: {
        '$GardenId$': req.params.gardenId
      },
      include: {
        model: Garden,
      }
    });
    res.json(plants);
  } catch (err) {
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (err) {
    next(err);
  }
})

router.post('/addgarden/:plantId/:gardenId', async (req, res, next) => {
  try {
    await PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: req.params.gardenId, PlantId: req.params.plantId});
    res.status(204).send();
  } catch (err) {
    next(err);
  }
})