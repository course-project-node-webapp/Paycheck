/* globals Promise */

'use strict';

module.exports = function (organizationsData, userData) {
  function index(req, res) {
    const organizationId = req.params.organizationId;
    const isAuthenticated = req.isAuthenticated();

    organizationsData.findById(organizationId)
      .then((organization) => {
        if (!organization) {
          res.redirect('/organizations/not-found');
        }

        let userRole = null;
        if (isAuthenticated) {
          userRole = organization.getRoleForUser(req.user);
        }

        res.render('./organizations/employees/index', {
          result: {
            user: req.user,
            userRole,
            organization
          },
          isAuthenticated
        });
      })
      .catch((err) => {
        // TODO: Log error.
        res.send(err.message);
      });
  }

  function addEmployeeForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    return userData.getAllUsersWithoutOrganization()
      .then((users) => {
        res.render('./organizations/employees/add', {
          isAuthenticated,
          result: {
            user: req.user,
            users,
            organizationId
          }
        });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  function addEmployee(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    const employeeId = req.params.employeeId;

    return Promise.all([
        organizationsData.findById(organizationId),
        userData.getUserById(employeeId)
      ])
      .then(([organization, user]) => {
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
        res.redirect(`/organizations/${organization._id}/employees`);
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  function removeEmployee(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const collectionName = req.params.role;
    const employeeId = req.params.employeeId;
    const organizationId = req.params.organizationId;

    return Promise.all([
        organizationsData.findById(organizationId),
        userData.getUserById(employeeId)
      ])
      .then(([organization, user]) => {
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
        res.redirect(`/organizations/${organization._id}/employees`);
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  return {
    index,
    addEmployeeForm,
    addEmployee,
    removeEmployee
  };
};