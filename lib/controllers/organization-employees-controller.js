/* globals Promise */

'use strict';

module.exports = function (organizationsData, userData) {
  function addEmployeeForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    return userData.getAllUsersWithoutOrganization()
      .then((users) => {
        res.render('./organizations/add-employee', {
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
        res.redirect(`/organizations/${organization._id}`);
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
        res.redirect(`/organizations/${organization._id}`);
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  return {
    addEmployeeForm,
    addEmployee,
    removeEmployee
  };
};