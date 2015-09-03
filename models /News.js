"use strict";

var mongoose = require('mongoose');

var News = mongoose.model('News', { 
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

module.exports = mongoose.model(News,'News');