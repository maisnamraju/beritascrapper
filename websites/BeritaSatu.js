//Its the same provider as TheJakartaGlobe so structure should be the same 

module.exports = function() {

    "use strict";

    require('../models/News.js');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var request = require('request-promise');    
    var parseString = require('xml2js').parseString;

    request('http://www.beritasatu.com/rss/beritasatu.xml')
           .then(function(xml) {

                parseString(xml, function (err, result) {
                    
                    var news = result.rss.channel[0].item;

                    news.forEach(function(item, index){  

                            News.findOneAndUpdate({
                                        Title: item.title[0]
                                    }, {
                                        Title: item.title[0],
                                        SiteName: 'Berita Satu',
                                        Url: item.link[0],
                                        Summary: item.description[0],
                                        Image: item.copyright[0]
                                    }, {
                                        upsert: true
                                    },function(err, resp) {
                                        console.log('beritasatu scrapped');
                                    });
                                
                    });                   

                });

           })

    

}
