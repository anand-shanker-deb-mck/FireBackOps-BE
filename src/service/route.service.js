const { Route } = require('../../models');

const addNewRouteService = async (body) => {
  const newRoute = await Route.create({
    name: body.name, r_config: body.r_config, p_id: body.p_id,
  });
  return newRoute;
};
const getAllRoutesService = async () => {
  const allRoutes = await Route.findAll();
  return allRoutes;
};
const updateRouteService = async (rid, body) => {
  let updatedRoute = await Route.update(
    { name: body.name, r_config: body.r_config, p_id: body.p_id }, { where: { id: rid } },
  );
  updatedRoute = updatedRoute > 0 ? await Route.findOne({ where: { id: rid } }) : 'Not a valid id';
  return updatedRoute;
};
module.exports = {
  addNewRouteService,
  getAllRoutesService,
  updateRouteService,
};
