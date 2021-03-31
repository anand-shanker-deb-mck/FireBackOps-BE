const setupRouter = () => `const express = require('express');

const router = express.Router();\n`;

const createRoute = (method, name, path) => `router.${method}('${path}', ${method}${name}Handler);\n`;

const createRouteHandler = (method, name) => `const {
  ${method}${name}Handler,
} = require('../handlers/${method}${name}Handler.js');\n\n`;

const exportRouter = () => `
module.exports = {
  router,
};\n`;

module.exports = {
  setupRouter, exportRouter, createRoute, createRouteHandler,
};
