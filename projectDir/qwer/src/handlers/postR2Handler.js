const {
  postR2Service,
} = require('../service/R2.service');

const postR2Handler = async (req, res) => {
  try {
    const { body } = req;
    const result = await postR2Service(body);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json();
  }
};
module.exports = {
  postR2Handler,
};
const {
  postR2Service,
} = require('../service/R2.service');

const postR2Handler = async (req, res) => {
  try {
    const { body } = req;
    const result = await postR2Service(body);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json();
  }
};
module.exports = {
  postR2Handler,
};
const {
  postR2Service,
} = require('../service/R2.service');

const postR2Handler = async (req, res) => {
  try {
    const { body } = req;
    const result = await postR2Service(body);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json();
  }
};
module.exports = {
  postR2Handler,
};
