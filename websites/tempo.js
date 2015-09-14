module.exports = function() {

    "use strict";

    require('../models/News.js');
    var request = require('request-promise');
    var mongoose = require('mongoose');
    var News = mongoose.model('News');
    var cheerio = require('cheerio');



    // will do later 
};