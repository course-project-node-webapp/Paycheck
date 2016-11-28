'use strict';

module.exports = function (organizationsData, userData) {
  function index(req, res) {
    const page = req.query.page || 0;
    const size = req.query.size || 5;

    organizationsData.findPage(page, size)
      .then(([organizations, pageCount]) => {
        const pagination = {
          active: +pageCount > 1,
          pageSize: size,
          previous: {
            active: +page > 0,
            value: +page - 1
          },
          next: {
            active: +page < +pageCount - 1,
            value: +page + 1
          }
        };

        res.render('./organizations/index', {
          isAuthenticated: req.isAuthenticated(),
          result: {
            organizations,
            pagination
          }
        });
      })
      .catch((err) => {
        // TODO: log error, fs logger ? 
        res.send(err.message);
      });
  }

  function details(req, res) {
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

        res.render('./organizations/details', {
          result: {
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

  function createOrganizationForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    return res.render('./organizations/create', {
      isAuthenticated
    });
  }

  function createOrganization(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.redirect('/account/login');
    }

    const inputOrganization = req.body;
    const owners = [{
      username: req.user.username,
      ownerId: req.user._id
    }];

    inputOrganization.owners = owners;

    return organizationsData.createOrganization(inputOrganization)
      .then((organization) => {
        req.user.organization = {
          name: organization.name,
          _id: organization._id
        };

        const redirectUrl = `/organizations/${organization._id}`;
        res.redirect(redirectUrl);
      })
      .catch((err) => {
        // TODO: Log errors.
        res.send(err.message);
      });
  }

  function addEmployeeForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      res.redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    userData.getAllUsersWithoutOrganization()
      .then((users) => {
        res.render('./organizations/add-employee', {
          isAuthenticated,
          result: {
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

  }

  return {
    index,
    details,
    createOrganizationForm,
    createOrganization,
    addEmployeeForm,
    addEmployee
  };
};