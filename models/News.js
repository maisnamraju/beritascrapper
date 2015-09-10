"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var News = new  Schema({ 
		SiteName : {
			type: 'String',
			default: null
		},
		Published: {
			type: 'Date',
			default: Date.now
		},
		Url: {
			type: 'String',
			required: true
		},
		Title: {
			type: 'String',
			required: true
		},
		Summary: {
			type: 'String',
			required: true
		},
		Image: {
			type: 'String',
			default: null
		}
	});


 module.exports = mongoose.model('News', News);