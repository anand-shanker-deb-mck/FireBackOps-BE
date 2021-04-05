const indexContent = (routesName) => {
  const uniqueRoute = routesName.filter((route, index, self) => self.indexOf(route) === index);
  const allRoutes = uniqueRoute.reduce((acc, curVal) => `${acc}app.use('/${curVal}', ${curVal}Router);\n`, '');
  const routerCode = uniqueRoute.reduce((acc, curVal) => `${acc}const { ${curVal}Router } = require('./routes');\n`, '');

  return `const express = require('express');
const env = require('dotenv');

${routerCode}
env.config();
const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

${allRoutes}
app.listen(port, () => {
  console.log(\`Server listening at http://localhost:\${port}\`);
});\n`;
};

module.exports = { indexContent };
