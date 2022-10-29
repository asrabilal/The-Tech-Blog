const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');


/*const seedAll = async () => {
  await sequelize.sync({ force: true });

  await userData();

  await postData();
  
  await commentData();

 

};

seedAll();*/

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await post.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const comments = await Comment.bulkCreate(commentData, {
  
    returning: true,
  });

  process.exit(0);
};

seedDatabase(); 
