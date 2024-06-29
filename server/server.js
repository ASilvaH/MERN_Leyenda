// src/server.js

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import songRoutes from './routes/song.routes.js';
import playlistRoutes from './routes/playlist.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI not defined in .env file');
  process.exit(1);
}

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.error('Error connecting to the database', error);
});

app.use(bodyParser.json());
app.use('/api', songRoutes);
app.use('/api', playlistRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});