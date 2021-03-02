const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const { DEFAULT_PORT } = require('./constants/config');
const { healthRouter, storeConfigRouter } = require('./routes');
const winston = require('./config/winston');

const app = express();
env.config();
const port = process.env.PORT || DEFAULT_PORT;

app.use(express.json());
app.use(morgan('combined', { stream: winston.stream }));

app.use('/ping', healthRouter);
app.use('/config', storeConfigRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
