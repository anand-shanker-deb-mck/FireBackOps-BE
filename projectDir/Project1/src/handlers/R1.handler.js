const services = require('../services/R1.service.js');

const R1getHandler = async (req, res) => {
  try {
    const result = await services.R1getService(req);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { R1getHandler };
