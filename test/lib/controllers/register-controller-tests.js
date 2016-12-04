/* globals describe it Promise*/

'use strict';

const sinon = require('sinon');

describe('registerController', () => {
  describe('index()', () => {
    it('Should invoke req.isAuthenticated()', () => {
      const userData = {},
        logger = {},
        req = {
          isAuthenticated: () => { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);
      const reqMock = sinon.mock(req);
      reqMock.expects('isAuthenticated').once();

      registerController.index(req, res);

      reqMock.verify();
    });

    it('Should invoke res.redirect() with url "/" when req.isAuthenticated() returns true', () => {
      const userData = {},
        logger = {},
        req = {
          isAuthenticated: () => { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);

      sinon.stub(req, 'isAuthenticated', function () {
        return true;
      });

      const resMock = sinon.mock(res);
      resMock.expects('redirect').withExactArgs('/').once();

      registerController.index(req, res);

      resMock.verify();
    });

    it('Should invoke res.status() with value "200" when req.isAuthenticated() returns false', () => {
      const userData = {},
        logger = {},
        req = {
          isAuthenticated: () => { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);

      sinon.stub(req, 'isAuthenticated', function () {
        return false;
      });

      const resMock = sinon.mock(res);
      resMock.expects('status').returnsThis().withExactArgs(200).once();

      registerController.index(req, res);

      resMock.verify();
    });

    it('Should invoke res.render() with value "./register/index" when req.isAuthenticated() returns false', () => {
      const userData = {},
        logger = {},
        req = {
          isAuthenticated: () => { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);

      sinon.stub(req, 'isAuthenticated', function () {
        return false;
      });

      const expectedView = './register/index';
      const resMock = sinon.mock(res);
      resMock.expects('render').returnsThis().withArgs(expectedView).once();

      registerController.index(req, res);

      resMock.verify();
    });

    it('Should invoke res.render() with correct data when req.isAuthenticated() returns false', () => {
      const userData = {},
        logger = {},
        req = {
          isAuthenticated: () => { },
          user: {
            username: 'stub'
          }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);

      sinon.stub(req, 'isAuthenticated', function () {
        return false;
      });

      const expectedView = './register/index';
      const expectedData = {
        isAuthenticated: false,
        result: {
          user: req.user
        }
      };

      const resMock = sinon.mock(res);
      resMock.expects('render').returnsThis().withExactArgs(expectedView, expectedData).once();

      registerController.index(req, res);

      resMock.verify();
    });
  });

  describe('register()', () => {
    it('Should invoke userData.getUserByUsername with correct value.', (done) => {
      const userData = {
        getUserByUsername: function () {
          return Promise.resolve(null);
        },
        createUser: function () {
          return Promise.resolve({ username: 'stub' });
        }
      },
        logger = {},
        req = {
          body: {
            username: 'stub user'
          },
          isAuthenticated: function () { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; },
          json: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);
      const userDataMock = sinon.mock(userData);
      userDataMock.expects('getUserByUsername').returns(Promise.resolve(null)).withExactArgs(req.body.username).once();

      registerController.register(req, res)
        .then(() => {
          userDataMock.verify();
        })
        .then(done, done);
    });

    it('Should invoke userData.createUser with correct value.', (done) => {
      const fakeUserModel = {
        username: 'stub'
      },
        userData = {
          getUserByUsername: function () {
            return Promise.resolve(null);
          },
          createUser: function () {
            return Promise.resolve(fakeUserModel);
          }
        },
        logger = {},
        req = {
          body: {
            username: 'stub user'
          },
          isAuthenticated: function () { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; },
          json: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);
      const userDataMock = sinon.mock(userData);
      userDataMock.expects('createUser')
        .returns(Promise.resolve(fakeUserModel))
        .withExactArgs(req.body).once();

      registerController.register(req, res)
        .then(() => {
          userDataMock.verify();
        })
        .then(done, done);
    });

    it('Should invoke res.status() with value "201".', (done) => {
      const fakeUserModel = {
        username: 'stub'
      },
        userData = {
          getUserByUsername: function () {
            return Promise.resolve(null);
          },
          createUser: function () {
            return Promise.resolve(fakeUserModel);
          }
        },
        logger = {},
        req = {
          body: {
            username: 'stub user'
          },
          isAuthenticated: function () { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; },
          json: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);
      const resMock = sinon.mock(res);
      resMock.expects('status')
        .returnsThis()
        .withExactArgs(201).once();

      registerController.register(req, res)
        .then(() => {
          resMock.verify();
        })
        .then(done, done);
    });

    it('Should invoke res.json() with correct value.', (done) => {
      const fakeUserModel = {
        username: 'stub'
      },
        userData = {
          getUserByUsername: function () {
            return Promise.resolve(null);
          },
          createUser: function () {
            return Promise.resolve(fakeUserModel);
          }
        },
        logger = {},
        req = {
          body: {
            username: 'stub user'
          },
          isAuthenticated: function () { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; },
          json: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);

      const expectedValue = {
        redirectUrl: '/profile',
        message: `Welcome ${fakeUserModel.username}`
      };

      const resMock = sinon.mock(res);
      resMock.expects('json')
        .returnsThis()
        .withExactArgs(expectedValue).once();

      registerController.register(req, res)
        .then(() => {
          resMock.verify();
        })
        .then(done, done);
    });

    it('Should invoke logger.info() with correct error message when userData.getUserByUsername() return a user.', (done) => {
      const fakeUserModel = {
        username: 'stub'
      },
        userData = {
          getUserByUsername: function () {
            return Promise.resolve(fakeUserModel);
          },
          createUser: function () {
            return Promise.resolve(fakeUserModel);
          }
        },
        logger = {
          info: function () { return this; }
        },
        req = {
          body: {
            username: 'stub user'
          },
          isAuthenticated: function () { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; },
          json: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);
      const loggerMock = sinon.mock(logger);
      loggerMock.expects('info')
        .withExactArgs('Username already exists.').once();

      registerController.register(req, res)
        .then(() => {
          loggerMock.verify();
        })
        .then(done, done);
    });

    it('Should invoke res.status() with value "400" when userData.getUserByUsername() finds a user.', (done) => {
      const fakeUserModel = {
        username: 'stub'
      },
        userData = {
          getUserByUsername: function () {
            return Promise.resolve(fakeUserModel);
          },
          createUser: function () {
            return Promise.resolve(fakeUserModel);
          }
        },
        logger = {
          info: function () { }
        },
        req = {
          body: {
            username: 'stub user'
          },
          isAuthenticated: function () { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; },
          json: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);
      const resMock = sinon.mock(res);
      resMock.expects('status')
        .returnsThis()
        .withExactArgs(400).once();

      registerController.register(req, res)
        .then(() => {
          resMock.verify();
        })
        .then(done, done);
    });

    it('Should invoke res.json() with correct value when userData.getUserByUsername() finds a user.', (done) => {
      const fakeUserModel = {
        username: 'stub'
      },
        userData = {
          getUserByUsername: function () {
            return Promise.resolve(fakeUserModel);
          },
          createUser: function () {
            return Promise.resolve(fakeUserModel);
          }
        },
        logger = {
          info: function () { }
        },
        req = {
          body: {
            username: 'stub user'
          },
          isAuthenticated: function () { }
        },
        res = {
          status: function () { return this; },
          render: function () { return this; },
          redirect: function () { return this; },
          json: function () { return this; }
        };

      const registerController = require('../../../lib/controllers/register-controller')(userData, logger);
      const resMock = sinon.mock(res);

      const expectedValue = {
        message: 'Username already exists.'
      };

      resMock.expects('json')
        .returnsThis()
        .withExactArgs(expectedValue).once();

      registerController.register(req, res)
        .then(() => {
          resMock.verify();
        })
        .then(done, done);
    });
  });
});