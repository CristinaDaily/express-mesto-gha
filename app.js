import express, { json } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(json());
app.use(cookieParser());
app.use(router);

app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

app.use(errorHandler);

async function init() {
  await mongoose.connect(MONGO_URL);

  await app.listen(PORT);
}

init();
