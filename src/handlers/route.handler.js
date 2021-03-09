const routeService = require('../service/route.service');

const addNewRouteHandler = async (req, res) => {
  try {
    const newRoute = await routeService.addNewRouteService(req.body);
    res.status(201).json({ message: newRoute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllRoutesHandler = async (req, res) => {
  try {
    const allRoutes = await routeService.getAllRoutesService();
    res.status(200).json(allRoutes);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateRouteHandler = async (req, res) => {
  try {
    const updatedRoute = await routeService.updateRouteService(
      req.params.id,
      req.body,
    );
    res.status(200).json({ updatedRoute });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addNewRouteHandler,
  getAllRoutesHandler,
  updateRouteHandler,
};
