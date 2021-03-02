const service = require('../service/login.service');

const loginHandler = (req, res) => {
  try {
    const { body } = req;
    if (body.token === undefined) {
      res.redirect(`/login.html?client_id=${process.env.CLIENT_ID}`);
      return;
    }
  } catch (error) {
    res.status(500).send();
  }
};

const oauthLoginHandler = async (req, res) => {
  try {
    const { query } = req;
    const token = await service.oauthLogin(query.code);
    res.status(200).send({ JWTtoken: token });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  loginHandler, oauthLoginHandler,
};
