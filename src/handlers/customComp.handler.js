const customCompServices = require('../service/customComp.service');
const InvalidBodyError = require('../errors/invalidBody.error');

const storeCustomCompHandler = async (req, res) => {
  const { body } = req;
  try {
    const dataReceived = await customCompServices.storeCustomComp(body);
    return res.status(200).json({ data: dataReceived });
  } catch (error) {
    if (error instanceof InvalidBodyError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server issues' });
  }
};

module.exports = {
  storeCustomCompHandler,
};
