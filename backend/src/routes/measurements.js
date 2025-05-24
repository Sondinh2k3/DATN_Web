import express from 'express';
import Measurement from '../models/Measurement.js';

const router = express.Router();

// Get latest measurement
router.get('/latest', async (req, res) => {
  try {
    const latestMeasurement = await Measurement.findOne({
      order: [['timestamp', 'DESC']]
    });

    if (!latestMeasurement) {
      return res.status(404).json({ message: 'No measurements found' });
    }

    res.json({
      latitude: latestMeasurement.latitude,
      longitude: latestMeasurement.longitude,
      water_level: latestMeasurement.waterLevel,
      timestamp: latestMeasurement.timestamp,
      base_status: 'OK', // You can modify these based on your requirements
      rover_status: 'RTK Fixed',
      gateway_status: 'Online'
    });
  } catch (error) {
    console.error('Error fetching latest measurement:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get historical measurements
router.get('/history', async (req, res) => {
  try {
    const measurements = await Measurement.findAll({
      order: [['timestamp', 'DESC']],
      limit: 10 // Get last 10 measurements
    });

    res.json(measurements.map(m => ({
      timestamp: m.timestamp,
      water_level: m.waterLevel
    })));
  } catch (error) {
    console.error('Error fetching historical measurements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router; 