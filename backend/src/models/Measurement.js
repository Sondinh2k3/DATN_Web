import { DataTypes } from 'sequelize';
import { sequelize } from '../../connection_database.js';

const Measurement = sequelize.define('Measurement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  waterLevel: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'measurements',
  timestamps: true
});

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Measurements table has been created successfully.');
  })
  .catch((error) => {
    console.error('Error creating Measurements table:', error);
  });

export default Measurement; 