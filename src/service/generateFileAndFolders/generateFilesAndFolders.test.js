const fse = require('fs-extra');
const server = require('./generateFilesAndFolders');

describe('Create PackageJSON', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockPackageJson = {
    name: 'abc',
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
  it('should return the default packageJson', () => {
    const packageJson = server.createPackageJson('abc');
    expect(packageJson).toEqual(JSON.stringify(mockPackageJson, null, 4));
  });
});

describe('Project folder structure', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it('should create the project directory based on the template', () => {
    const spyOnPathExisting = jest.spyOn(fse, 'pathExistsSync').mockReturnValue(false);
    const spyOnMakeDir = jest.spyOn(fse, 'mkdirSync').mockReturnValue(null);
    jest.spyOn(fse, 'writeFile').mockReturnValue(null);
    server.generateProjectFolderStructure('abc');
    expect(spyOnPathExisting).toHaveBeenCalledWith('abc');
    expect(spyOnMakeDir).toHaveBeenNthCalledWith(1, 'abc');
    expect(spyOnMakeDir).toHaveBeenNthCalledWith(2, 'abc/src');
    expect(spyOnMakeDir).toHaveBeenNthCalledWith(3, 'abc/src/routes');
    expect(spyOnMakeDir).toHaveBeenNthCalledWith(4, 'abc/src/handlers');
    expect(spyOnMakeDir).toHaveBeenNthCalledWith(5, 'abc/src/services');
    expect(spyOnMakeDir).toHaveBeenNthCalledWith(6, 'abc/src/utils');
  });
  it('should return that the Project already exists', () => {
    jest.spyOn(fse, 'pathExistsSync').mockImplementation((projectName) => {
      throw new Error(`Project ${projectName} already exists!`);
    });
    try {
      server.generateProjectFolderStructure('def');
    } catch (err) {
      expect(err.message).toBe('Project def already exists!');
    }
  });
});

describe('Generate FIle Structure', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should generate the files in the right folder and write into those files', () => {
    const mockOnWriteFile = jest.spyOn(fse, 'writeFile').mockReturnValue(null);
    const mockRouteName = ['abc', 'def'];
    server.generateFileStructure('ibibo', mockRouteName);
    mockRouteName.forEach((routeName, index) => {
      expect(mockOnWriteFile).toHaveBeenNthCalledWith(index * 3 + 1, `ibibo/src/routes/${routeName}.route.js`, '');
      expect(mockOnWriteFile).toHaveBeenNthCalledWith(index * 3 + 2, `ibibo/src/handlers/${routeName}.handler.js`, '');
      expect(mockOnWriteFile).toHaveBeenNthCalledWith(index * 3 + 3, `ibibo/src/services/${routeName}.service.js`, '');
    });
    expect(mockOnWriteFile).toHaveBeenCalledWith('ibibo/src/utils/index.js', '');
    expect(mockOnWriteFile).toHaveBeenCalledWith('ibibo/src/routes/index.js', '');
  });
});
