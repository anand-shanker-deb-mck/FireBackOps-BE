const updateHandlerService = require('./updateHandler');
const updateDependencyService = require('./updatePackageJson');

const updateHandlerAndDependency = (routes = ['flight', 'hotel'], projectName = 'generatedFolder') => {
  updateDependencyService.updatePackageJson(projectName);
  routes.forEach((routeName) => updateHandlerService.updateHandler(projectName, routeName, 'input.json'));
};

updateHandlerAndDependency();
module.exports = { updateHandlerAndDependency };
