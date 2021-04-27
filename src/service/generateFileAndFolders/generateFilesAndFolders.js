const fse = require('fs-extra');

const createPackageJson = (projectName) => {
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: 'jest',
      start: 'node ./src/index.js',
    },
    author: '',
    license: 'ISC',
    dependencies: {
      dotenv: '^8.2.0',
      express: '^4.17.1',
    },
    devDependencies: {
      jest: '^26.6.3',
    },
  };
  return JSON.stringify(packageJson, null, 4);
};

const generateProjectFolderStructure = (projectName, projectPath) => {
  if (!fse.pathExistsSync(projectPath)) {
    fse.mkdirSync(projectPath);
    fse.writeFile(`${projectPath}/package.json`, createPackageJson(projectName));
    fse.writeFile(`${projectPath}/.gitignore`, 'node_modules');
    fse.mkdirSync(`${projectPath}/src`);
    fse.mkdirSync(`${projectPath}/src/routes`);
    fse.mkdirSync(`${projectPath}/src/handlers`);
    fse.mkdirSync(`${projectPath}/src/services`);
    fse.mkdirSync(`${projectPath}/src/utils`);
    fse.mkdirSync(`${projectPath}/src/handlers/__test__`);
    fse.mkdirSync(`${projectPath}/src/services/__test__`);
    fse.mkdirSync(`${projectPath}/src/utils/__test__`);
  } else {
    console.log(`Project ${projectPath} already exists!`);
  }
};

const generateFileStructure = (projectName, routeNames, projectPath) => {
  routeNames.forEach((routeName) => {
    fse.writeFile(`${projectPath}/src/routes/${routeName}.route.js`, '');
    fse.writeFile(`${projectPath}/src/handlers/${routeName}.handler.js`,
      '');
    fse.writeFile(`${projectPath}/src/services/${routeName}.service.js`,
      '');
    fse.writeFile(`${projectPath}/src/handlers/__test__/${routeName}.handler.test.js`, '');
    fse.writeFile(`${projectPath}/src/services/__test__/${routeName}.service.test.js`, '');
  });
  fse.writeFile(`${projectPath}/src/utils/index.js`, '');
  fse.writeFile(`${projectPath}/src/utils/__test__/index.test.js`, '');
  fse.writeFile(`${projectPath}/src/routes/index.js`, '');
};

module.exports = { createPackageJson, generateProjectFolderStructure, generateFileStructure };
