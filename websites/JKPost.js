module.exports = function() {

var request = require('request');
var fs = require('fs');
var News = require('News.js');
var cheerio = require('cheerio');

 
request('http://www.thejakartapost.com/', function(err, resp, html ) {

if(!err && resp.statusCode === 200 ) {

	var $ = cheerio.load(html);
	
	var dateExp = /([0-9][0-9]):([0-9][0-9])(\s)(AM|PM)/g;

	$('div.breaking-list li').each(function(index, element){
		
		var temp = $(element).html();

		var time = $(temp).find('.date').text();

		var headline = $(temp).find('a').text();

		var url = $(temp).find('a').attr('href');
		
		var newsContent = getNewsDetailsJKPost(url);	

		var source = 'TheJakartaPost';

		var News = new News();

		// Checks if the news is present already , if not inserts  
		//http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
		
		News.findOneAndUpdate({ Title: headlines },
							  { Title: headlines, SiteName: source, Url: url, Summary: newsContent[1], Image: newsContent[1] }, 
							  { 
							  	upsert: true							  	
							  });

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


			return [ img, news ];

		}

	});

};


}

