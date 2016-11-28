'use strict';

module.exports = function (organizationsData) {
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

    let userRole = null;
    if (req.isAuthenticated()) {
      userRole = req.user.role || userRole;
    }

    organizationsData.findById(organizationId)
      .then((organization) => {
        
      })
      .catch((err) => {
        // TODO: Log error.
        res.send(err.message);
      });
  }

  return {
    index,
    details
  };
};