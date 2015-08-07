'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var helplines = require('../../app/controllers/helplines.server.controller');

	// Helplines Routes
	app.route('/helplines')
		.get(helplines.list)
		.post(users.requiresLogin, helplines.create);

	app.route('/helplines/:helplineId')
		.get(helplines.read)
		.put(users.requiresLogin, helplines.hasAuthorization, helplines.update)
		.delete(users.requiresLogin, helplines.hasAuthorization, helplines.delete);

	// Finish by binding the Helpline middleware
	app.param('helplineId', helplines.helplineByID);
};
