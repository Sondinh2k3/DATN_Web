'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PositionData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PositionData.init({
    timestamp: DataTypes.DATE,
    latitude: DataTypes.DECIMAL(9, 6),
    longitude: DataTypes.DECIMAL(9, 6),
    rover_status: DataTypes.STRING,
    device_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PositionData',
  });
  return PositionData;
};