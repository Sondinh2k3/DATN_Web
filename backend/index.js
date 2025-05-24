import express from 'express';
import cors from 'cors';
import { connection } from './connection_database.js';
import measurementsRouter from './src/routes/measurements.js';
import './src/services/mqttService.js';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/measurements', measurementsRouter);

// Initialize database connection
connection();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});