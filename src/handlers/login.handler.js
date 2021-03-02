const service = require('../service/login.service');

const loginHandler = (req, res) => {
  const { body } = req;
  if (body.token === undefined) {
    res.redirect(`/login.html?client_id=${process.env.CLIENT_ID}`);
    return;
  }
  res.status(200).send();
};

const oauthLoginHandler = async (req, res) => {
  const { query } = req;
  const token = await service.oauthLogin(query.code);
  res.status(200).send({ JWTtoken: token });
};

module.exports = {
  loginHandler, oauthLoginHandler,
};
