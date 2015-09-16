module.exports = function() {
	"use strict";

	require('../models/News.js');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var request = require('request-promise');  
    var cheerio = require('cheerio');  
    var parseString = require('xml2js').parseString;
   
    request('http://news.kompas.com/')
    	  .then(function(resp) {

    	  	var $ = cheerio.load(resp);

    	  	$('div#leftside div.kcm-idx-channel.mt2 li').each(function(index, item ) {

    	  		var $$ = cheerio.load(item);

    	  		var img = $$('.img-latest img').attr('src') || 'http://assets.kompas.com/data/2015/kanal/news/images/kcm-logo.png';
    	  			
    	  			// Image thumbnail is very small, need to extract the real image     	  			
    	  		
    	  		var url = $$('.list-latest a').attr('href');

    	  		var title = $$('.list-latest a').text();

    	  		var description = $$('.list-latest-cont').text();    	  		

    	  		News.findOneAndUpdate({
                                        Title: title
                                    }, {
                                        Title: title,
                                        SiteName: 'Kompas',
                                        Url: url,
                                        Summary: description,
                                        Image: img
                                    }, {
                                        upsert: true
                                    },function(err, resp) {
                                        console.log('Kompas scrapped');
                    });
                                
    	  		
    	  	});



  	
  	});



};