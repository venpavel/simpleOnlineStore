const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const fileUpload = require('express-fileupload');
const sequelize = require('./db');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT || 8081;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('static'));
app.use('/api', router);

// Обработка ошибок, последний middleware
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Backend server started at ${PORT} port.`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
