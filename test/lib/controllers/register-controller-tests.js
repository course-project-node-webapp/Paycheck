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

    it('Should invoke res.Redirect() with correct url when req.isAuthenticated() returns true', () => {
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
  });
});