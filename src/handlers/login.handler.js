const service = require('../services/login.service');

const oauthLoginHandler = async (req, res) => {
  try {
    const { body } = req;
    const { jwtToken, username } = await service.oauthLogin(body.code);
    res.status(200).send({ jwtToken, username });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  oauthLoginHandler,
};
