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
    	    	    
    	  	parseString(xml,function(err, resp) {
    	  		 	
    	  		   var news = resp;
    	  		   // check first if data is proper xml, if it is not then redo the request again 
		    	   if(err) {
		    	   	   request('http://www.kapanlagi.com/feed/')	
		    	   	   	.then(function(xml1) {
		    	   	   		parseString(data,function(err1, resp1 ) {
		    	   	   			news = resp;
		    	   	   		});
		    	   	   	});		    	   
		    	   }


		    	   console.log(typeof news);

		    	   news.rss.channel[0].item.forEach(function(item,index) {

		    	   		/*console.log({
		    	   			title: item.title[0],
		    	   			url: item.guid[0],
		    	   			img:item.enclosure[0].$.url
		    	   		});*/

		    	   		request(item.guid[0])
		    	   			.then(function(res){

		    	   				// same issue as before with the character encoding 		    	   				
		    	   				//console.log(res.headers['content-type']);
		    	   				var encoding = 'iso-8859-1';

		    	   				//console.log(iconv.decode(res,encoding));

		    	   				/*
		    	   					News.findOneAndUpdate({
                                        Title: item.title[0]
                                    }, {
                                        Title: item.title[0],
                                        SiteName: 'Kapanlagi',
                                        Url: item.link[0],
                                        Summary: item.description[0],
                                        Image: 'http://jakartaglobe.beritasatu.com/assets/desktop/images/footer/logo.png'
                                    }, {
                                        upsert: true
                                    },function(err, resp) {
                                        console.log('Kapanlagi scrapped');
                                    });*/

		    	   			})


		    	   })
    	  	});

   	});

};