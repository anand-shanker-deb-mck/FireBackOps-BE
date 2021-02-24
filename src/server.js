const express = require('express');
const env = require('dotenv');
const { DEFAULT_PORT } = require('./constants/config');
const { healthRouter, githubRouter } = require('./routes/index');

const app = express();
env.config();
const port = process.env.PORT || DEFAULT_PORT;

app.use('/ping', healthRouter);
app.use(express.json());
app.use('/github', githubRouter);
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
