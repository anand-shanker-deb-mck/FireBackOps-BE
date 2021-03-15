const fse = require('fs-extra');

const createPackageJson = (projectName) => {
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: "echo 'Error: no test specified' && exit 1",
    },
    author: '',
    license: 'ISC',
    dependencies: {
    },
  };
  return JSON.stringify(packageJson, null, 4);
};

const generateProjectFolderStructure = (projectName) => {
  if (!fse.pathExistsSync(projectName)) {
    fse.mkdirSync(projectName);
    fse.writeFile(`${projectName}/package.json`, createPackageJson(projectName));
    fse.mkdirSync(`${projectName}/src`);
    fse.mkdirSync(`${projectName}/src/routes`);
    fse.mkdirSync(`${projectName}/src/handlers`);
    fse.mkdirSync(`${projectName}/src/services`);
    fse.mkdirSync(`${projectName}/src/utils`);
  } else {
    console.log(`Project ${projectName} already exists!`);
  }
};

const generateFileStructure = (projectName, routeNames) => {
  routeNames.forEach((routeName) => {
    fse.writeFile(`${projectName}/src/routes/${routeName}.route.js`, '');
    fse.writeFile(`${projectName}/src/handlers/${routeName}.handler.js`,
      '');
    fse.writeFile(`${projectName}/src/services/${routeName}.service.js`,
      '');
  });
  fse.writeFile(`${projectName}/src/utils/index.js`, '');
  fse.writeFile(`${projectName}/src/routes/index.js`, '');
};

module.exports = { createPackageJson, generateProjectFolderStructure, generateFileStructure };
