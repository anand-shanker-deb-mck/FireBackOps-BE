const healthHandler = (req, res) => {
  res.status(200).send('pong');
};

module.exports = {
  healthHandler,
};
