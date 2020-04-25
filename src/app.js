require('dotenv').config();

const path = require('path');
const Youch = require('youch');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const routes = require('./routes');
const logger = require('./helper/logger');

const app = express();

app.use(helmet());

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/images',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(routes);

app.use(async (error, req, res) => {
  if (error) {
    const errors = await new Youch(error, req).toJSON();
    logger.error(JSON.stringify(errors));
    if (process.env.NODE_ENV !== 'production') {
      return res.status(500).json({ errors });
    }
    return res.status(500).json({ error: 'Houve um erro interno na API' });
  }
});

app.listen(3000, () => logger.info(`🚀️ API DE CHOCOLATE SUBIU`));
