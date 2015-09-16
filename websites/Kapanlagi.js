//Its the same provider as TheJakartaGlobe so structure should be the same 

module.exports = function() {

    "use strict";

    require('../models/News.js');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var request = require('request-promise');  
    var cheerio = require('cheerio');  
    var parseString = require('xml2js').parseString;
    var fs = require('fs');
    var iconv = require('iconv-lite');

    request('http://www.kapanlagi.com/feed/')
    	   .then(function(xml) {    	   	
    	       
    	   	// https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding
    	   	// Dont think I'm doing anything wrong here since it is just the buffer data itself 
    	   	iconv.skipDecodeWarning = true; // sets the warning to off 

    	   	var convertedData = iconv.decode(xml, 'iso-8859-1');    	   	

    	  	parseString(convertedData,function(err, resp) {
    	  		 	
    	  		   var news = resp;
    	  		   
    	  		   // check first if data is proper xml, if it is not then redo the request again 
		    	   if(err) {
		    	   	   request('http://www.kapanlagi.com/feed/')	
		    	   	   	.then(function(xml1) {
		    	   	   		parseString(data,function(err1, resp1 ) {
		    	   	   			news = resp1;
		    	   	   		});
		    	   	   	});		    	   
		    	   }
		  

		    	   news.rss.channel[0].item.forEach(function(item,index) {

		    	  /* 		console.log({
		    	   			title: item.title[0],
		    	   			url: item.guid[0],
		    	   			img:item.enclosure[0].$.url,
		    	   			desc: item.description[0]
		    	   		});
		    	   				*/
    	   				
    	   					News.findOneAndUpdate({
                                Title: item.title[0]
                            }, {
                                Title: item.title[0],
                                SiteName: 'Kapanlagi',
                                Url: item.link[0],
                                Summary: item.description[0],
                                Image: item.enclosure[0].$.url
                            }, {
                                upsert: true
                            },function(err, resp) {
                                console.log('Kapanlagi scrapped');
                            });

		    	   });
    	  	});

   	});

};