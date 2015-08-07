'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Helpline = mongoose.model('Helpline'),
	_ = require('lodash');

/**
 * Create a Helpline
 */
exports.create = function(req, res) {
	var helpline = new Helpline(req.body);
	helpline.user = req.user;

	helpline.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(helpline);
		}
	});
};

/**
 * Show the current Helpline
 */
exports.read = function(req, res) {
	res.jsonp(req.helpline);
};

/**
 * Update a Helpline
 */
exports.update = function(req, res) {
	var helpline = req.helpline ;

	helpline = _.extend(helpline , req.body);

	helpline.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(helpline);
		}
	});
};

/**
 * Delete an Helpline
 */
exports.delete = function(req, res) {
	var helpline = req.helpline ;

	helpline.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(helpline);
		}
	});
};

/**
 * List of Helplines
 */
exports.list = function(req, res) { 
	Helpline.find().sort('-created').populate('user', 'displayName').exec(function(err, helplines) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(helplines);
		}
	});
};

/**
 * Helpline middleware
 */
exports.helplineByID = function(req, res, next, id) { 
	Helpline.findById(id).populate('user', 'displayName').exec(function(err, helpline) {
		if (err) return next(err);
		if (! helpline) return next(new Error('Failed to load Helpline ' + id));
		req.helpline = helpline ;
		next();
	});
};

/**
 * Helpline authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.helpline.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
