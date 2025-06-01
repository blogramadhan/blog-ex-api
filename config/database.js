const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog_api', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;