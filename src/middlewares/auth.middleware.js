const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const jwtToken = authHeader.split(' ')[1];
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401).send();
        return;
      }

      req.user = user;
      next();
    });
  } else {
    res.status(400).send();
  }
};

module.exports = { authenticateJwt };
