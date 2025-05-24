import mqtt from 'mqtt';
import Measurement from '../models/Measurement.js';

class MQTTService {
  constructor() {
    this.client = null;
    this.connect();
  }

  connect() {
    this.client = mqtt.connect('mqtt://192.168.1.11:1883');

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.client.subscribe('datn_gpsrtk', (err) => {
        if (err) {
          console.error('Error subscribing to topic:', err);
        } else {
          console.log('Subscribed to topic: datn_gpsrtk');
        }
      });
    });

    this.client.on('message', async (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received MQTT message:', data);

        // Validate the data
        if (!data.latitude || !data.longitude || !data.waterLevel) {
          console.error('Invalid data format:', data);
          return;
        }

        // Create new measurement record
        const measurement = await Measurement.create({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          waterLevel: parseFloat(data.waterLevel),
          timestamp: new Date()
        });

        console.log('New measurement saved:', measurement.toJSON());
      } catch (error) {
        console.error('Error processing MQTT message:', error);
        console.error('Raw message:', message.toString());
      }
    });

    this.client.on('error', (error) => {
      console.error('MQTT Error:', error);
    });

    this.client.on('close', () => {
      console.log('MQTT connection closed');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    });
  }
}

export default new MQTTService(); 