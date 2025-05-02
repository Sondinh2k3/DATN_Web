'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PositionDatas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timestamp: { type: Sequelize.DATE},
      latitude: { type: Sequelize.DECIMAL(9, 6)},
      longitude: { type: Sequelize.DECIMAL(9, 6)},
      rover_status: { type: Sequelize.STRING},
      device_id: { type: Sequelize.STRING},
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')},
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PositionDatas');
  }
};