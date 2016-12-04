/* globals describe it */

'use strict';

const sinon = require('sinon');

describe('messageController', () => {
  describe('index()', () => {
    it('Should invoke req.isAuthenticated()', () => {
      const messageData = {},
        req = {
          isAuthenticated: () => {}
        },
        res = {
          status: function () {
            return this;
          },
          render: function () {
            return this;
          },
          redirect: function () {
            return this;
          }
        };

      const messageController = require('../../../lib/controllers/message-controller')(messageData);
      const reqMock = sinon.mock(req);
      reqMock.expects('isAuthenticated').once();

      messageController.index(req, res);

      reqMock.verify();
    });

    it('Should invoke res.status() with value "400" when req.isAuthenticated() returns false', () => {
      const messageData = {},
        req = {
          isAuthenticated: () => {}
        },
        res = {
          status: function () {
            return this;
          },
          render: function () {
            return this;
          },
          redirect: function () {
            return this;
          }
        };

      const messageController = require('../../../lib/controllers/message-controller')(messageData);

      sinon.stub(req, 'isAuthenticated', function () {
        return false;
      });

      const resMock = sinon.mock(res);
      resMock.expects('status').returnsThis().withExactArgs(400).once();

      messageController.index(req, res);

      resMock.verify();
    });

    it('Should invoke res.redirect() with url "/account/login" when req.isAuthenticated() returns false', () => {
      const messageData = {},
        req = {
          isAuthenticated: () => {}
        },
        res = {
          status: function () {
            return this;
          },
          render: function () {
            return this;
          },
          redirect: function () {
            return this;
          }
        };

      const messageController = require('../../../lib/controllers/message-controller')(messageData);

      sinon.stub(req, 'isAuthenticated', function () {
        return false;
      });

      const resMock = sinon.mock(res);
      resMock.expects('redirect').withExactArgs('/account/login').once();

      messageController.index(req, res);

      resMock.verify();
    });

    it('Should invoke res.status() with value "200" when req.isAuthenticated() returns true', () => {
      const messageData = {},
        req = {
          isAuthenticated: () => {}
        },
        res = {
          status: function () {
            return this;
          },
          render: function () {
            return this;
          },
          redirect: function () {
            return this;
          }
        };

      const messageController = require('../../../lib/controllers/message-controller')(messageData);

      sinon.stub(req, 'isAuthenticated', function () {
        return true;
      });

      const resMock = sinon.mock(res);
      resMock.expects('status').returnsThis().withExactArgs(200).once();

      messageController.index(req, res);

      resMock.verify();
    });

    it('Should invoke res.render() with value "./messaging/index" when req.isAuthenticated() returns true', () => {
      const messageData = {},
        req = {
          isAuthenticated: () => {}
        },
        res = {
          status: function () {
            return this;
          },
          render: function () {
            return this;
          },
          redirect: function () {
            return this;
          }
        };

      const messageController = require('../../../lib/controllers/message-controller')(messageData);

      sinon.stub(req, 'isAuthenticated', function () {
        return true;
      });

      const expectedView = './messaging/index';
      const resMock = sinon.mock(res);
      resMock.expects('render').returnsThis().withArgs(expectedView).once();

      messageController.index(req, res);

      resMock.verify();
    });

    it('Should invoke res.render() with correct data when req.isAuthenticated() returns true', () => {
      const messageData = {},
        req = {
          isAuthenticated: () => {},
          user: {
            username: 'stub'
          }
        },
        res = {
          status: function () {
            return this;
          },
          render: function () {
            return this;
          },
          redirect: function () {
            return this;
          }
        };

      const messageController = require('../../../lib/controllers/message-controller')(messageData);

      sinon.stub(req, 'isAuthenticated', function () {
        return true;
      });

      const expectedView = './messaging/index';
      const expectedData = {
        isAuthenticated: true,
        isAuthorized: true,
        result: {
          user: req.user,
          userData: req.user
        }
      };

      const resMock = sinon.mock(res);
      resMock.expects('render').returnsThis().withExactArgs(expectedView, expectedData).once();

      messageController.index(req, res);

      resMock.verify();
    });
  });
});