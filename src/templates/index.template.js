const indexContent = () => `const express = require('express');
const env = require('dotenv');

const { router } = require('./routes');

env.config();
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use('', router);

app.listen(port, () => {
  console.log(\`Server listening at http://localhost:\${port}\`);
});\n`;

module.exports = { indexContent };
