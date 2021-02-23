const fileGenService = require('../services/fileGeneration.service');

const createFiles = (req, res) => {
//   console.log(req.body);
  fileGenService.generateFiles(req.body);
  res.status(200).send('Folder created');
};

module.exports = {
  createFiles,
};
