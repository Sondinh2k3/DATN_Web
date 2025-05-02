'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: { type: Sequelize.STRING},
      email: { type: Sequelize.STRING, unique: true, allowNull: false},
      password: { type: Sequelize.STRING, allowNull: false},
      avatar: { type: Sequelize.STRING},
      role: { type: Sequelize.STRING, defaultValue: 'R3'},
      lastLogin: { type: Sequelize.DATE},
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};