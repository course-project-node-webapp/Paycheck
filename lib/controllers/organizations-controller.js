/* globals Promise */

'use strict';

const logger = require('../../config/logger');

module.exports = function (organizationsData, userData) {
  function index(req, res) {
    const page = +req.query.page || 0;
    const size = +req.query.size || 5;

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
            user: req.user,
            organizations,
            pagination
          }
        });
      })
      .catch((err) => {
        res.redirect('/error');
      });
  }

  function search(req, res) {
    const isAuthenticated = req.isAuthenticated();

    organizationsData.getOrganizationsWhichContains(req.query.search)
      .then((organizations) => {
        return res
          .status(200)
          .render('./organizations/organizations-list', {
            isAuthenticated,
            result: {
              data: organizations,
              user: req.user
            }
          });
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

        const user = req.user;

        let isMember;
        if (user) {
          isMember = user.organization.name === organization.name;
        }

        res.render('./organizations/details', {
          result: {
            user,
            isMember,
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
      isAuthenticated,
      result: {
        user: req.user
      }
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
        const user = req.user;
        user.organization = {
          name: organization.name,
          organizationId: organization._id
        };

        return userData.updateUser(user);
      })
      .then((user) => {
        const redirectUrl = `/organizations/${user.organization.organizationId}`;
        res.redirect(redirectUrl);
      })
      .catch((err) => {
        // TODO: Log errors.
        res.send(err.message);
      });
  }

  function applyForm(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.status(500).redirect('/account/login');
    }

    // return res.send('I WUZ HEER!');
    return organizationsData.findById(organizationId)
      .then((organization) => {
        res.status(200)
          .render('./organizations/apply', {
            isAuthenticated,
            result: {
              user: req.user,
              organization
            }
          });
      })
      .catch(() => {
        res.status(500).redirect('/error');
      });
  }

  function addApplication(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.status(500).redirect('/account/login');
    }

    const newApplication = req.body;
    if (!newApplication) {
      return res.status(500).redirect('/account/login');
    }

    // return res.send('I WUZ HEER!');
    const user = req.user;
    return organizationsData.findById(organizationId)
      .then((organization) => {
        organization.applications = organization.applications || [];
        const userHasAlreadyApplied = organization.applications.some(a => a.username === user.username);
        if (userHasAlreadyApplied) {
          return res.status(200)
            .render('./organizations/apply-fail', {
              isAuthenticated,
              result: {
                user
              }
            });
        }

        organization.applications.push({
          username: user.username,
          userId: user._id,
          comment: newApplication.comment
        });

        return organizationsData.updateOrganization(organization);
      })
      .then(() => {
        res.status(200)
          .render('./organizations/apply-success', {
            isAuthenticated,
            result: {
              user
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(500).redirect('/error');
      });
  }

  function listApplications(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.status(500).redirect('/account/login');
    }

    // return res.send('I WUZ HEER');
    return organizationsData.findById(organizationId)
      .then((organization) => {
        if (!organization) {
          logger.info('No organization with this ID found.');
          return res.status(500).redirect('/account/login');
        }

        return res.status(200)
          .render('./organizations/applications-list', {
            isAuthenticated,
            result: {
              organization
            }
          });
      })
      .catch((err) => {
        logger.info(err.message);
        return res.status(500).redirect('/account/login');
      });
  }

  function approveApplication(req, res) {
    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      return res.status(401).redirect('/account/login');
    }

    const organizationId = req.params.organizationId;
    if (!organizationId) {
      return res.status(500).redirect('/account/login');
    }

    const userId = req.params.userId;
    if (!userId) {
      return res.status(500).redirect('/account/login');
    }

    // return res.send('I WUZ HEER');
    return Promise.all([
      organizationsData.findById(organizationId),
      userData.getUserById(userId)
    ])
      .then(([organization, user]) => {
        const userAlreadyAssigned = organization.unassigned.some(u => u.username === user.username);
        if (userAlreadyAssigned) {
          return res.status(400).redirect('/error');
        }

        if (user.organization) {
          return Promise.all([
            new Promise(resolve => resolve(organization)),
            new Promise(resolve => resolve(user)),
            organizationsData.findByName(user.organization.name)
          ]);
        }

        return Promise.all([
          new Promise(resolve => resolve(organization)),
          new Promise(resolve => resolve(user))
        ]);
      })
      .then(([organization, user, previousOrganization]) => {
        organization.unassigned.push({
          username: user.username,
          unassignedId: user._id
        });

        if (previousOrganization !== null) {
          return Promise.all([
            organizationsData.updateOrganization(organization),
            organizationsData.updateOrganization(previousOrganization),
            userData.updateUser(user)
          ]);
        }

        return Promise.all([
          organizationsData.updateOrganization(organization),
          organizationsData.updateOrganization(previousOrganization)
        ]);
      })
      .then(() => {
        res.status(200).redirect(`/organizations/${organizationId}/employees`);
      })
      .catch((err) => {
        logger.info(err.message);
        res.status(500).redirect('/error');
      });
  }

  return {
    index,
    search,
    details,
    createOrganizationForm,
    createOrganization,
    applyForm,
    addApplication,
    listApplications,
    approveApplication
  };
};