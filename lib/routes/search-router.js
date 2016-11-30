'use strict';

module.exports = function({ app, express, data, controllerLoaders }) {
  const searchData = {
    usersData: data.usersData,
    projectsData: data.projectsData,
    organizationsData: data.organizationsData
  };

  const {
    searchControllerLoader
  } = controllerLoaders;

  let searchController = false;
  const searchRouter = new express.Router();
  searchRouter
    .get('/', (req, res) => {
      if (!searchController) {
        searchController = searchControllerLoader(searchData);
      }

      searchController.search(req, res);
    });

  app.use('/search', searchRouter);
};