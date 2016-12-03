/* globals describe it*/

'use strict';

const chai = require('chai');
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
});