module.exports = function() {

    "use strict";

    require('../models/News.js');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var request = require('request-promise');    
    var parseString = require('xml2js').parseString;

    request('http://jakartaglobe.beritasatu.com/rss/news/')
           .then(function(xml) {

                parseString(xml, function (err, result) {
                    
                    var news = result.rss.channel[0].item;

                    news.forEach(function(item, index){                        

                            News.findOneAndUpdate({
                                        Title: item.title
                                    }, {
                                        Title: item.title,
                                        SiteName: 'TheJakartaGlobe',
                                        Url: item.link,
                                        Summary: item.description,
                                        Image: 'http://jakartaglobe.beritasatu.com/assets/desktop/images/footer/logo.png'
                                    }, {
                                        upsert: true
                                    },function(err, resp) {
                                        console.log('JKGlobe scrapper');
                                    });
                                
                    });                   

                });

           })

    

}
