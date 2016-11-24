/* globals module Promise */

'use strict';

module.exports = function (models) {
	let User = models.User;

	return {
		getAllUsers() {
			return new Promise((resolve, reject) => {
				User.find((err, users) => {
					if (err) {
						return reject(err);
					}

					return resolve(users);
				});
			});
		},
		getUserById(id) {
			return new Promise((resolve, reject) => {
				User.findOne({
					_id: id
				}, (err, user) => {
					if (err) {
						return reject(err);
					}

					return resolve(user);
				});
			});
		},
		createUser(user) {
			let userModel = models.getUser(user);

			return new Promise((resolve, reject) => {
				userModel.save(err => {
					if (err) {
						return reject(err);
					}

					return resolve(userModel);
				});
			});
		}
	};
};