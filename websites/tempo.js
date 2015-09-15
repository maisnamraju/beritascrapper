module.exports = function() {

    "use strict";

    require('../models/News.js');
    var request = require('request-promise');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var $ = require('cheerio');
    var parseString = require('xml2js').parseString;


    request('http://rss.tempo.co/index.php/teco/news/feed/start/0/limit/20')
    		.then(function(xml){

    		parseString(xml, function (err, result) {     

    				var data =result.rss.channel[0].item;

    				data.forEach(function(item, index) {

    						var img;
    						 // conditional for image - just in case image is not present 
    					
    						if( $(item['content:encoded'][0]).find('img') ) {
    							
    							img = $(item['content:encoded'][0]).find('img').attr('src'); // not a good practice but it works for now 

    							// remove the 960 from the width and then replace it with 350 to reduce the size of the image

    							img = img.replace(960, 350);
    							

    						} else {
    						
    							img = 'http://cdn.tmpo.co/web/teco/images/logo-tempo-small.png';
    						
    						}
    					

    						
    						 News.findOneAndUpdate({
                                    Title: item.title[0]
                                }, {
                                    Title: item.title[0],
                                    SiteName: 'Tempo',
                                    Url: item.link[0],
                                    Summary: item.description[0],
                                    Image: img
                                }, {
                                    upsert: true
                                },function(err, resp) {
                                    	console.log('Tempo Bahasa Indonesia scrapped');
                               		});


    				});


			});
	});

    //

    
};