'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Helpline = mongoose.model('Helpline'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, helpline;

/**
 * Helpline routes tests
 */
describe('Helpline CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Helpline
		user.save(function() {
			helpline = {
				name: 'Helpline Name'
			};

			done();
		});
	});

	it('should be able to save Helpline instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Helpline
				agent.post('/helplines')
					.send(helpline)
					.expect(200)
					.end(function(helplineSaveErr, helplineSaveRes) {
						// Handle Helpline save error
						if (helplineSaveErr) done(helplineSaveErr);

						// Get a list of Helplines
						agent.get('/helplines')
							.end(function(helplinesGetErr, helplinesGetRes) {
								// Handle Helpline save error
								if (helplinesGetErr) done(helplinesGetErr);

								// Get Helplines list
								var helplines = helplinesGetRes.body;

								// Set assertions
								(helplines[0].user._id).should.equal(userId);
								(helplines[0].name).should.match('Helpline Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Helpline instance if not logged in', function(done) {
		agent.post('/helplines')
			.send(helpline)
			.expect(401)
			.end(function(helplineSaveErr, helplineSaveRes) {
				// Call the assertion callback
				done(helplineSaveErr);
			});
	});

	it('should not be able to save Helpline instance if no name is provided', function(done) {
		// Invalidate name field
		helpline.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Helpline
				agent.post('/helplines')
					.send(helpline)
					.expect(400)
					.end(function(helplineSaveErr, helplineSaveRes) {
						// Set message assertion
						(helplineSaveRes.body.message).should.match('Please fill Helpline name');
						
						// Handle Helpline save error
						done(helplineSaveErr);
					});
			});
	});

	it('should be able to update Helpline instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Helpline
				agent.post('/helplines')
					.send(helpline)
					.expect(200)
					.end(function(helplineSaveErr, helplineSaveRes) {
						// Handle Helpline save error
						if (helplineSaveErr) done(helplineSaveErr);

						// Update Helpline name
						helpline.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Helpline
						agent.put('/helplines/' + helplineSaveRes.body._id)
							.send(helpline)
							.expect(200)
							.end(function(helplineUpdateErr, helplineUpdateRes) {
								// Handle Helpline update error
								if (helplineUpdateErr) done(helplineUpdateErr);

								// Set assertions
								(helplineUpdateRes.body._id).should.equal(helplineSaveRes.body._id);
								(helplineUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Helplines if not signed in', function(done) {
		// Create new Helpline model instance
		var helplineObj = new Helpline(helpline);

		// Save the Helpline
		helplineObj.save(function() {
			// Request Helplines
			request(app).get('/helplines')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Helpline if not signed in', function(done) {
		// Create new Helpline model instance
		var helplineObj = new Helpline(helpline);

		// Save the Helpline
		helplineObj.save(function() {
			request(app).get('/helplines/' + helplineObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', helpline.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Helpline instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Helpline
				agent.post('/helplines')
					.send(helpline)
					.expect(200)
					.end(function(helplineSaveErr, helplineSaveRes) {
						// Handle Helpline save error
						if (helplineSaveErr) done(helplineSaveErr);

						// Delete existing Helpline
						agent.delete('/helplines/' + helplineSaveRes.body._id)
							.send(helpline)
							.expect(200)
							.end(function(helplineDeleteErr, helplineDeleteRes) {
								// Handle Helpline error error
								if (helplineDeleteErr) done(helplineDeleteErr);

								// Set assertions
								(helplineDeleteRes.body._id).should.equal(helplineSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Helpline instance if not signed in', function(done) {
		// Set Helpline user 
		helpline.user = user;

		// Create new Helpline model instance
		var helplineObj = new Helpline(helpline);

		// Save the Helpline
		helplineObj.save(function() {
			// Try deleting Helpline
			request(app).delete('/helplines/' + helplineObj._id)
			.expect(401)
			.end(function(helplineDeleteErr, helplineDeleteRes) {
				// Set message assertion
				(helplineDeleteRes.body.message).should.match('User is not logged in');

				// Handle Helpline error error
				done(helplineDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Helpline.remove().exec();
		done();
	});
});