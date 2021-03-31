const service = require('../services/generate.service');

const generateCodeHandler = async (req, res) => {
  try {
    await service.generateCodeService('./projectDir', 'Project1', [{ name: 'route1', method: 'get', path: '/:id' }]);
    res.status(200).send({ message: 'successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = {
  generateCodeHandler,
};
