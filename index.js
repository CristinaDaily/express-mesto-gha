import express, { json } from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.01:27017/mestodb' } =
  process.env;

const app = express();

app.use(json());
app.use((req, res, next) => {
  req.user = {
    _id: '65130cbb3b8bba21cf622523', //  _id созданного пользователя
  };

  next();
});
app.use(router);

async function init() {
  await mongoose.connect(MONGO_URL);

  await app.listen(PORT);
}

init();
