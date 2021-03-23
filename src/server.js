const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const { DEFAULT_PORT } = require('./constants/config');
const { router } = require('./routes');
const winston = require('../config/winston');

env.config();
const port = process.env.PORT || DEFAULT_PORT;
const app = express();

app.use(cors());
app.use(express.static(`${__dirname}/template`));
app.use(express.json());
app.use(morgan('combined', { stream: winston.stream }));
app.use('', router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
