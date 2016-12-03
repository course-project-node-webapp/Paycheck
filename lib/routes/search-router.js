'use strict';

module.exports = function ({ app, express, data, controllerLoaders }) {
  const searchData = {
    usersData: data.usersData,
    projectsData: data.projectsData,
    organizationsData: data.organizationsData
  };

  const {
    searchControllerLoader
  } = controllerLoaders;

  const searchController = searchControllerLoader(searchData);
  const searchRouter = new express.Router();
  searchRouter
    .get('/', searchController.search);

  app.use('/search', searchRouter);
};