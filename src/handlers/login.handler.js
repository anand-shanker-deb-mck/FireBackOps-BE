const service = require('../service/login.service');

const loginHandler = async (req, res) => {
  try {
    const { user } = req;
    if (user) {
      res.status(200).send({ user: { username: user.username }, message: 'Successfully Logged In!', jwtToken: req.headers.authorization.split(' ')[1] });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const oauthLoginHandler = async (req, res) => {
  try {
    const { query } = req;
    const token = await service.oauthLogin(query.code);
    res.status(200).send({ jwtToken: token });
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = {
  loginHandler, oauthLoginHandler,
};
