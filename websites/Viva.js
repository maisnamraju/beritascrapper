module.exports = function() {
	"use strict";

	require('../models/News.js');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var request = require('request-promise');  
    var cheerio = require('cheerio');  
    var parseString = require('xml2js').parseString;
    var fs = require('fs');

    request('http://rss.viva.co.id/get/all')
    	  .then(function(xml) {

    	  	  // Takes some time to get the data but it works 

	    	  parseString(xml, function(err, resp ) {
											
					resp.rss.channel[0].item.forEach(function(item, index) {

						var $ = cheerio.load(item.description[0]);					
												
						var img = $('img').attr('src');
						
						// replaces the image with an exmpty text 
						var description = item.description[0].replace(/<img([\w\W]+?)\/>/, ''); 						
						
						News.findOneAndUpdate({
                                        Title: item.title[0]
                                    }, {
                                        Title: item.title[0],
                                        SiteName: 'Viva',
                                        Url: item.link[0],
                                        Summary: description,
                                        Image: img
                                    }, {
                                        upsert: true
                                    },function(err, resp) {
                                        console.log('Viva La Vida');
                                    });		

					});	 
	    	  });


 	 });

};
