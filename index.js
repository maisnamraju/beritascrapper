(function() {

"use strict";

var app = require('express');
var cheerio = require('cheerio');
var mongoose = require('mongoose'); 
var request = require('request');
    app = app();

/*First Try scrapping a site  - I  want it all to be modular but i havent figured it out yet */
var jakartaPost = [];
 
request('http://www.thejakartapost.com/', function(err, resp, html ) {

if(!err && resp.statusCode === 200 ) {

	var $ = cheerio.load(html);
	var dateExp = /([0-9][0-9]):([0-9][0-9])(\s)(AM|PM)/g;

	$('div.breaking-list li').each(function(index, element){
		
		var temp = $(element).html();

		var time = $(temp).find('.date').text();

		var headline = $(temp).find('a').text();

		var url = $(temp).find('a').attr('href');

		/*time to get the summary*/
		getNewsDetailsJKPost(url);
	

	});

}


}); 

var getNewsDetailsJKPost = function(url) {

	var newsImage;
	var newsDetails;
	
	request(url,function(err, resp, html) {

		if(!err && resp.statusCode === 200 ) {

			var $ = cheerio.load(html);

			var img = $('div.teaser>img.image').attr('src');

			if(typeof img === 'undefined') {
			 	
			 	img = "http://placehold.it/350x150";
			
			}

			/*Take only the first paragraph */
			var news = $('div.span-13.last p:first-child').html();

		}

	});

};



app.listen(3000);  


})();