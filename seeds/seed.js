const sequelize = require('../config/connection');
const { User, Merchandise, Posting } = require('../models');

const userData = require('./userData.json');
const merchandiseData = require('./consoleData.json');
const postingData = require('./postingData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const merchandise = await Merchandise.bulkCreate(merchandiseData, {
     individualHooks: true,
     returning: true 
  });

  for (const posting of postingData) {
    await Posting.create({
      ...posting,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      merchandise_id: merchandise[Math.floor(Math.random() * merchandise.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
