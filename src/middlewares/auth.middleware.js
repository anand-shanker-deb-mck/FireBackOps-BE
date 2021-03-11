const jwt = require('jsonwebtoken');

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const jwtToken = authHeader.split(' ')[1];

    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.redirect(`/login.html?client_id=${process.env.CLIENT_ID}`);
        } else {
          res.status(401).send({ message: 'Unauthenticated' });
        }
        return;
      }
      req.user = user;
    });
    next();
  } else {
    res.redirect(`/login.html?client_id=${process.env.CLIENT_ID}`);
  }
};

module.exports = { authenticateJwt };
