module.exports = function() {

    "use strict";

    require('../models/News.js');
    var request = require('request-promise');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var cheerio = require('cheerio');

    var getNewsDetailsJKPost = function(html) {

        var $ = cheerio.load(html);

        var img = $('div.teaser>img.image').attr('src');

        if (typeof img === 'undefined') {

            img = "http://placehold.it/350x150";

        }

        /*Take only the first paragraph */
        var news = $('div.span-13.last p:nth-child(2)').html();

        return [news, img];

    };


    request('http://www.thejakartapost.com/')
        .then(function(html) {

            var $ = cheerio.load(html);

            var dateExp = /([0-9][0-9]):([0-9][0-9])(\s)(AM|PM)/g;

            $('div.breaking-list li').each(function(index, element) {

                var temp = $(element).html();

                var time = $(temp).find('.date').text();

                var headlines = $(temp).find('a').text();

                var url = $(temp).find('a').attr('href');

                var source = 'TheJakartaPost';

                request(url).then(function(body) {

                    var newsContent = getNewsDetailsJKPost(body);

                    // Checks if the news is present already , if not inserts  
                    //http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate

                    News.findOneAndUpdate({
                        Title: headlines
                    }, {
                        Title: headlines,
                        SiteName: source,
                        Url: url,
                        Summary: newsContent[0],
                        Image: newsContent[1]
                    }, {
                        upsert: true
                    },function(err, resp) {
                    	console.log(err);
                    });

                    return true;

                });

                	return true;
            });
					return true;
        });



}
