const {
  getR1Service,
} = require('../service/R1.service');

const getR1Handler = async (req, res) => {
  try {
    const { body, params } = req;
    const result = await getR1Service(body, params);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json();
  }
};
module.exports = {
  getR1Handler,
};
const {
  getR1Service,
} = require('../service/R1.service');

const getR1Handler = async (req, res) => {
  try {
    const { body, params } = req;
    const result = await getR1Service(body, params);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json();
  }
};
module.exports = {
  getR1Handler,
};
const {
  getR1Service,
} = require('../service/R1.service');

const getR1Handler = async (req, res) => {
  try {
    const { body, params } = req;
    const result = await getR1Service(body, params);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json();
  }
};
module.exports = {
  getR1Handler,
};
