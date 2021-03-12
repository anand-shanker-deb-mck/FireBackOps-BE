const configServices = require('../service/config.service');
const InvalidBodyError = require('../errors/invalidBody.error');

const updateConfigHandler = async (req, res) => {
  const { body } = req;
  try {
    const dataReceived = await configServices.updateConfig(body);
    return res.status(200).json({ data: dataReceived });
  } catch (error) {
    if (error instanceof InvalidBodyError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server issues' });
  }
};
module.exports = {
  updateConfigHandler,
};
