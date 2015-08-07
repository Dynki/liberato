'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Helpline Schema
 */
var HelplineSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Helpline name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Helpline', HelplineSchema);