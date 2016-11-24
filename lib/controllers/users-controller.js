'use strict';

module.exports = function (data) {
	return {
		getAll(req, res) {
			data.getAllUsers()
				.then(users => {
					// TODO:
				});
		},
		getById(req, res) {
			data.getUserById(req.params.id)
				.then(user => {
					// TODO:
				});
		},
		create(req, res) {
			let body = req.body;
			data.createUser(body.user)
				.then(() => {
					// TODO: 
				});
		}
	};
};