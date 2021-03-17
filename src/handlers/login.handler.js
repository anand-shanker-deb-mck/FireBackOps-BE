const service = require('../services/login.service');

const oauthLoginHandler = async (req, res) => {
  try {
    const { body } = req;
    const token = await service.oauthLogin(body.code);
    res.status(200).send({ jwtToken: token });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  oauthLoginHandler,
};
