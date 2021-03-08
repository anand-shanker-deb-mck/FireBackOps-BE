const express = require('express');
const env = require('dotenv');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { DEFAULT_PORT } = require('./constants/config');
const { healthRouter, projectRouter, storeConfigRouter } = require('./routes');

const winston = require('../config/winston');

const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || DEFAULT_PORT;
const app = express();

env.config();

app.use(express.json());
app.use('/ping', healthRouter);
app.use('/project', projectRouter);
app.use(morgan('combined', { stream: winston.stream }));

app.use('/config', storeConfigRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
