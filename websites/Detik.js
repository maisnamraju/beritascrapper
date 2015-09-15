module.exports = function() {

    "use strict";

    require('../models/News.js');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var request = require('request-promise');        
    var $ = require('cheerio');
    var moment = require('moment');
    var parseString = require('xml2js').parseString;


    request('http://detik.feedsportal.com/c/33613/f/656082/index.rss')
           .then(function(xml) {

                parseString(xml, function (err, result) {                    
                    
                var news = result.rss.channel[0].item; 

                news.forEach(function(item, index){                        

                        var image;

                        if(typeof item.enclosure !== 'undefined') { // checks if image is present 
                            
                            image = item.enclosure[0].$.url +'?w=350&q=150' ;
                        
                        }else {
                            image = 'http://news.detik.com/images/logodetiknews.png';
                        }

                        var summary = $(item.description[0]).text();                        
                        
                         News.findOneAndUpdate({
                                    Title: item.title[0]
                                }, {
                                    Title: item.title[0],
                                    SiteName: 'Detik',
                                    Url: item.link[0],
                                    Summary: summary,
                                    Image: image
                                }, {
                                    upsert: true
                                },function(err, resp) {
                                    console.log('Detik scrapped');
                                });
                                
                    });              

                });

           })



    

}
