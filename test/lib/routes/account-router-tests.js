// /* globals describe it Promise */

// 'use strict';

// const chai = require('chai');
// const chaihttp = require('chai-http');

// chai.use(chaihttp);

// describe('accountRouter', () => {
//   describe('get /login', () => {
//     it('Should work', function (done) {
//       const config = {
//         sessionSecret: 'asdf',
//         rootPath: './',
//         errorResponseCode: '400'
//       };

//       const data = {
//         userData: {

//         }
//       };

//       const accountControllerLoader = require('../../../lib/controllers/account-controller');
//       const registerControllerLoader = require('../../../lib/controllers/register-controller');
//       const accountUpdateControllerLoader = require('../../../lib/controllers/account-update-controller');

//       const controllerLoaders = {
//         accountControllerLoader,
//         registerControllerLoader,
//         accountUpdateControllerLoader
//       };

//       const logger = {
//         info: function () {

//         }
//       };

//       const parametersValidator = function (req, res, next) {
//         next();
//       };

//       require('../../../config/passport')(data.userData);
//       const express = require('express');
//       const app = require('../../../config/express')(config);

//       require('../../../lib/routes/account-router')({
//         app,
//         express,
//         data,
//         controllerLoaders,
//         logger,
//         parametersValidator
//       });

//       new Promise(resolve => {
//         app.listen(3002, () => {
//           return resolve(app);
//         });
//       })
//         .then(() => {
//           return new Promise(resolve => {
//             chai.request(app)
//               .get('/account/login')
//               .end(function (req, res) {
//                 chai.expect(res.status).equals(200);
//                 resolve();
//               });
//           });
//         })
//         .then(done, done);
//     });
//   });
// });