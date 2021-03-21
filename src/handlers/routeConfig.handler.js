const routeConfigSevices = require('../service/routeConfig.service');

const routeConfigHandler = (async (req, res) => {
  const { id } = req.params;
  try {
    const configList = await routeConfigSevices.getRouteConfig(id);
    res.status(200).json({ data: configList });
  } catch (error) {
    if (error.message === 'Route not found') { res.status(400).json({ message: error.message }); } else { res.status(500).json({ message: 'Internal server error' }); }
  }
});

module.exports = {
  routeConfigHandler,
};
