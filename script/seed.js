'use strict'

const db = require('../server/db')
const {User, Garden, Plant, PlantGarden} = require('../server/db/models')
const Sequelize = require('sequelize')


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', name: 'Cody', password: '123'}),
    User.create({email: 'murphy@email.com', name: 'Murphy', password: '123'})
  ])
  const gardens = await Promise.all([
    Garden.create({userId: 1}),
    Garden.create({userId: 2})
  ])
  const dayToMs = 86400000
  const threeDays = 3 * dayToMs;
  const twoWeeks = 14 * dayToMs;
  const oneWeek = 7 * dayToMs;
  const threeWeeks = 21 * dayToMs;

  let plantSchedule1 = [{time: threeDays, task: "Water seedlings"}, {time: twoWeeks, task: "Thin out seedlings so that they're 4 inches apart."}];
  plantSchedule1 = JSON.stringify(plantSchedule1);
  let plantSchedule2 = [{time: oneWeek, task: "Weed the garden"}, {time: threeWeeks, task: "Harvest largest plants"}];
  plantSchedule2 = JSON.stringify(plantSchedule2);
  let season1 = ["April", "May", "June", "July", "August", "September"];
  season1 = JSON.stringify(season1);
  let season2 = ["March", "April", "May", "October", "November"];
  season2 = JSON.stringify(season2);

  const plants = await Promise.all([
    Plant.create({
      name: "Arugula",
      schedule: plantSchedule1,
      season: season1,
      yield: 1.4,
      daysToHarvest: 50
    }),
    Plant.create({
      name: "Chili Pepper",
      schedule: plantSchedule2,
      season: season2,
      yield: 2.3,
      daysToHarvest: 90
    })
  ])
  const plantGardens = await Promise.all([
    PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: 1, PlantId: 1}),
    PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: 1, PlantId: 2}),
    PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: 2, PlantId: 1}),
    PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: 2, PlantId: 2})
  ])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${gardens.length} gardens`)
  console.log(`seeded ${plants.length} plants`)
  console.log(`seeded ${plantGardens.length} plant-garden associations`)
  
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
