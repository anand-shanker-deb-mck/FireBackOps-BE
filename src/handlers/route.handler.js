const routeService = require('../service/route.service');

const addNewRouteHandler = async (req, res) => {
  try {
    const newRoute = await routeService.addNewRouteService(req.body);
    res.status(201).send(newRoute);
  } catch (error) {
    res.status(500).send();
  }
};
const getAllRoutesByProjectIDHandler = async (req, res) => {
  try {
    const { params } = req;
    const allRoutes = await routeService.getAllRoutesByProjectIDService(
      params.pid,
    );
    res.status(200).send(allRoutes);
  } catch (error) {
    res.status(500).send();
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
const getRouteDetailsHandler = async (req, res) => {
  try {
    const { params } = req;
    const routeDetails = await routeService.getRouteDetails(params.id);
    return res.status(200).json({ data: routeDetails });
  } catch (error) {
    if (error.message === 'Route not found') { return res.status(404).json({ message: 'Route id not found' }); }
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addNewRouteHandler,
  getAllRoutesByProjectIDHandler,
  updateRouteHandler,
  getRouteDetailsHandler,
};
