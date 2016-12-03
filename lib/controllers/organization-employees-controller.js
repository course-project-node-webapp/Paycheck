/* globals Promise */

'use strict';

module.exports = function (organizationsData, userData, logger) {
  function index(req, res) {
    if (!req.allParametersExist) {
      logger.info('Request parameters not found.');
      return res.status(400).redirect('/error');
    }

    const organizationId = req.params.organizationId;
    const isAuthenticated = req.isAuthenticated();

    return organizationsData.findById(organizationId)
      .then((organization) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        let userRole = null;
        if (isAuthenticated) {
          userRole = organization.getRoleForUser(req.user);
        }

        return res.status(200)
          .render('./organizations/employees/index', {
            result: {
              user: req.user,
              userRole,
              organization
            },
            isAuthenticated
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function addEmployeeForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    if (!req.allParametersExist) {
      logger.info('Request parameters not found.');
      return res.status(400).redirect('/error');
    }

    const organizationId = req.params.organizationId;
    return userData.getAllUsersWithoutOrganization()
      .then((users) => {
        res.status(200)
          .render('./organizations/employees/add', {
            isAuthenticated,
            result: {
              user: req.user,
              users,
              organizationId
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function addEmployee(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    if (!req.allParametersExist) {
      logger.info('Request parameters not found.');
      return res.status(400).redirect('/error');
    }

    const organizationId = req.params.organizationId;
    const employeeId = req.params.employeeId;

    return Promise.all([
      organizationsData.findById(organizationId),
      userData.getUserById(employeeId)
    ])
      .then(([organization, user]) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!user) {
          logger.info(`Organization with ID: ${employeeId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        organization.unassigned.push({
          username: user.username,
          unassignedId: user._id.toString()
        });

        user.role = 'unassigned';
        user.organization = {
          name: organization.name,
          organizationId: organization._id.toString()
        };

        return Promise.all([
          organizationsData.updateOrganization(organization),
          userData.updateUser(user)
        ]);
      })
      .then(([organization]) => {
        res.status(200).redirect(`/organizations/${organization._id}/employees`);
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  function removeEmployee(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    if (!req.allParametersExist) {
      logger.info('Request parameters not found.');
      return res.status(400).redirect('/error');
    }

    const collectionName = req.params.role;
    const employeeId = req.params.employeeId;
    const organizationId = req.params.organizationId;

    return Promise.all([
      organizationsData.findById(organizationId),
      userData.getUserById(employeeId)
    ])
      .then(([organization, user]) => {
        if (!organization) {
          logger.info(`Organization with ID: ${organizationId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        if (!user) {
          logger.info(`Organization with ID: ${employeeId} not found.`);
          return res.status(400).redirect('/organizations/not-found');
        }

        organization[collectionName] = organization[collectionName].filter(e => e.username !== user.username);

        user.role = 'visitor';
        user.organization = {
          name: 'unassigned'
        };

        return Promise.all([
          organizationsData.updateOrganization(organization),
          userData.updateUser(user)
        ]);
      })
      .then(([organization]) => {
        res.status(200).redirect(`/organizations/${organization._id}/employees`);
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(400).redirect('/error');
      });
  }

  return {
    index,
    addEmployeeForm,
    addEmployee,
    removeEmployee
  };
};