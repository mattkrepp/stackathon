'use strict'

const db = require('../server/db')
const {User, Garden, Plant, PlantGarden} = require('../server/db/models')
const Sequelize = require('sequelize')


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', name: 'Cody', password: '123'}),
    User.create({email: 'murphy@email.com', name: 'Murphy', password: '123'}),
    User.create({email: 'mattkrepp@gmail.com', name: 'Matt', password: '123'})
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

  let plantScheduleArugula = [
    {time: threeDays, task: "Water seedlings"}, 
    {time: twoWeeks, task: "Thin out seedlings to a distance of 2 inches."},
    {time: threeWeeks, task: "Harvest largest plants"},
    {time: threeWeeks + dayToMs, task: "Overseed garden to ensure continual harvest"},
    {time: threeWeeks + oneWeek, task: "Harvest largest plants"},
    {time: threeWeeks + oneWeek + oneWeek, task: "Fertilize using mild high nitrogen liquid fertilizer solution"},
    {time: threeWeeks * 2, task: "Harvest largest plants"}
  ];
  plantScheduleArugula = JSON.stringify(plantScheduleArugula);
  
  let plantScheduleChiliPepper = [
    {time: oneWeek + (dayToMs * 2), task: "Weed the garden"}, 
    {time: threeWeeks, task: "Thin plants to a distance of 1 foot"},
    {time: threeWeeks + dayToMs, task: "Fertilize with mild high nitrogen solution"},
    {time: threeWeeks + oneWeek + threeDays, task: "Prune branches that cross other plants"},
    {time: threeWeeks + twoWeeks, task: "Cull buds to max 4 per stalk"},
    {time: threeWeeks * 2, task: "Fertilize with high potassium fertilizer"},
    {time: threeWeeks * 3, task: "Harvest ripe peppers!"},
    {time: threeWeeks * 3 + oneWeek, task: "Harvest ripe peppers!"}
  ];
  plantScheduleChiliPepper = JSON.stringify(plantScheduleChiliPepper);

  let plantScheduleTomato = [
    {time: oneWeek + threeDays, task: "Thin out seedlings to a distance of 9 inches."},
    {time: oneWeek + oneWeek + dayToMs, task: "Fertilize using a high nitrogen fertilizer"},
    {time: threeWeeks + dayToMs, task: "Tie stalks to stakes"},
    {time: threeWeeks + oneWeek + threeDays, task: "Prune branches that cross other plants."},
    {time: threeWeeks + oneWeek + oneWeek, task: "Fertilize using a high potassium fertilizer"},
    {time: threeWeeks + threeWeeks, task: "If tomatoes are abundant, thin to approximately 15 per plant"},
    {time: threeWeeks * 3 + oneWeek, task: "Harvest tomatoes!"}
  ]
  plantScheduleTomato = JSON.stringify(plantScheduleTomato);

  let plantScheduleEggplant = [
    {time: twoWeeks, task: "Thin seedlings to a distance of 18 inches"},
    {time: threeWeeks, task: "Thin seedlings to a distance of 3 feet"},
    {time: twoWeeks * 2 + dayToMs, task: "Fertilize using a high nitrogen fertilizer"},
    {time: threeWeeks * 2, task: "Thin eggplants to approximately 5 per plant"},
    {time: threeWeeks * 3, task: "Harvest eggplants!"}
  ]
  plantScheduleEggplant = JSON.stringify(plantScheduleEggplant);

  let plantScheduleSweetPeas = [
    {time: dayToMs, task: "Plant seeds beneath trellis or climbing tree"},
    {time: twoWeeks + dayToMs, task: "Tie any unattached stems to trellis"},
    {time: threeWeeks + threeDays, task: "Fertilize using a high nitrogen fertilizer"},
    {time: threeWeeks * 2 + twoWeeks, task: "Harvest ripe pea pods!"}
  ]
  plantScheduleSweetPeas = JSON.stringify(plantScheduleSweetPeas);

  let plantScheduleCucumbers = [
    {time: threeDays, task: "Pinch off yellow seedlings"},
    {time: oneWeek + threeDays, task: "Transplant to sunny location"},
    {time: threeWeeks, task: "Thin seedlings to a distance of 2 feet"},
    {time: threeWeeks * 4, task: "Harvest largest cucumbers"}
  ]
  plantScheduleCucumbers = JSON.stringify(plantScheduleCucumbers);


  let seasonArugula = ["04", "05", "06", "07", "08", "09"];
  seasonArugula = JSON.stringify(seasonArugula);

  let seasonChiliPepper = ["03", "04", "05", "10", "11"];
  seasonChiliPepper = JSON.stringify(seasonChiliPepper);

  let seasonTomato = ["04", "05", "06", "07", "08", "09", "10"]
  seasonTomato = JSON.stringify(seasonTomato);

  let seasonEggplant = ["05", "06", "07", "08", "09"];
  seasonEggplant = JSON.stringify(seasonEggplant);

  let seasonSweetPeas = ["03", "04", "05", "06", "09", "10", "11"];
  seasonSweetPeas = JSON.stringify(seasonSweetPeas);

  let seasonCucumbers = ["04", "05", "06", "09", "10"];
  seasonCucumbers = JSON.stringify(seasonCucumbers);


  const plants = await Promise.all([
    Plant.create({
      name: "Arugula",
      schedule: plantScheduleArugula,
      season: seasonArugula,
      yield: 1.4,
      daysToHarvest: 50,
      imageUrl: "https://cdn8.bigcommerce.com/s-q83qdckkjh/images/stencil/1024x1024/products/254/2639/Wild-Italian-ArugulaBC__02936.1506536350.jpg?c=2"
    }),
    Plant.create({
      name: "Chili Pepper",
      schedule: plantScheduleChiliPepper,
      season: seasonChiliPepper,
      yield: 2.3,
      daysToHarvest: 90,
      imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71Bl8JbkPEL._SX425_.jpg"
    }),
    Plant.create({
      name: "Tomato",
      schedule: plantScheduleTomato,
      season: seasonTomato,
      yield: 2.7,
      daysToHarvest: 70,
      imageUrl: "https://gardeners.s3.amazonaws.com/p/VETOM30892_3.jpg"
    }),
    Plant.create({
      name: "Eggplant",
      schedule: plantScheduleEggplant,
      season: seasonEggplant,
      yield: 3.3,
      daysToHarvest: 63,
      imageUrl: "https://images.homedepot-static.com/productImages/de72fda8-da4c-428b-8557-fb7d3770c041/svn/bonnie-plants-vegetable-plants-2601-64_1000.jpg"
    }),
    Plant.create({
      name: "Sweet Peas", 
      schedule: plantScheduleSweetPeas,
      season: seasonSweetPeas,
      yield: 1.2,
      daysToHarvest: 56,
      imageUrl: "https://www.dhresource.com/0x0s/f2-albu-g5-M00-86-A3-rBVaJFjs58qAIZ6jAAQQpd0Lf_g761.jpg/20-pcs-pea-seeds-sweet-pea-seeds-multi-grain.jpg"
    }),
    Plant.create({
      name: "Cucumber",
      schedule: plantScheduleCucumbers,
      season: seasonCucumbers,
      yield: 2.3,
      daysToHarvest: 94,
      imageUrl: "https://cdn.shopify.com/s/files/1/2918/4630/products/Image_1_905e83f8-6e39-4651-a710-48d9a6fa7fcc.jpg?v=1527363323"
    })

  ])
  const plantGardens = await Promise.all([
    PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: 1, PlantId: 1}),
    PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: 1, PlantId: 2}),
    PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: 1, PlantId: 3}),
    PlantGarden.create({plantDate: Sequelize.fn('NOW'), GardenId: 1, PlantId: 4}),
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
