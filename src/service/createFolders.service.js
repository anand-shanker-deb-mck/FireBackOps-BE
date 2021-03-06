/* eslint-disable import/no-self-import */
const { Project, Route, Configuration } = require('../../models');
const createFoldersHelper = require('./createFolder.service.helper');

const getRouteDetailsService = async (projectId) => {
  const projectDetails = await Project.findOne({
    include: [
      {
        model: Route,
        as: 'routes',
        attributes: ['name', 'method', 'end_point', 'r_config'],
        include: [
          {
            model: Configuration,
            as: 'configurations',
            attributes: [
              'componentType',
              'payload',
              'sequence',
              'refName',
              'dependencies',
            ],
          },
        ],
      },
    ],
    where: {
      id: projectId,
    },
    attributes: [['name', 'projectName']],
  });

  const newProjectDetails = JSON.parse(JSON.stringify(projectDetails));
  const filteredDetails = await createFoldersHelper.filterDetails(
    newProjectDetails,
  );
  return filteredDetails;
};

module.exports = { getRouteDetailsService };
