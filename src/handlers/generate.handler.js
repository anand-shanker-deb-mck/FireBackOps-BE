const service = require('../services/generate.service');

const generateCodeHandler = async (req, res) => {
  try {
    const { body } = req;
    await service.generateCodeService(
      body.projectId,
    );
    res.status(200).send({ message: 'successful' });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  generateCodeHandler,
};
