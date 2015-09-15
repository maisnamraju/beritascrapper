module.exports = function() {

    "use strict";

    require('../models/News.js');
    var request = require('request-promise');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var cheerio = require('cheerio');

    request('http://en.tempo.co/index')
    	.then(function(data) {

			var $ = cheerio.load(data);    					

			$('ul.indeks-list li').each(function(index,item){				
				
				var temp = $(item);
				
				var url = 'http://en.tempo.co'+$(item).find('h2 a').attr('href');

				var title = $(item).find('h2').text();

				var date = $(item).find(".tanggal").text();

				var dateArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

					date = date.replace('WIB', '')
							   .replace(',', '')							   
							   .replace('|', ''); // lets see if chaining works , never tried it before 

			    // WILL DO LATER -- Convert date to ISO datetime

			/*	for( var day in dateArray) { // maps to index in array 					

					date = date.replace(dateArray[day], '');
				};

				var date = new Date(date);*/

					
				request(url)
					  .then(function(newsdetails) {

					  		var $ = cheerio.load(newsdetails);

					  		var img = $('div.foto-konten img').attr('src');

							$('div.tubuh-berita p:first-child').find('strong').remove();
							$('div.tubuh-berita p:first-child').find('span').remove()


							var summary = $('div.tubuh-berita p:first-child').text();

							summary = summary.replace(', -', '');

							 News.findOneAndUpdate({
								                        Title: title
								                    }, {
								                        Title: title,
								                        SiteName: 'Tempo',
								                        Url: url,
								                        Summary: summary,
								                        Image: img
								                    }, {
								                        upsert: true
								                    },function(err, resp) {
								                    	console.log('Tempo English Scrapped scrapped');
								                    });

								                    return true;

					  });	



			});   		


    	});

};