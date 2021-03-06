"use strict";

var app = require('express');
var mongoose = require('mongoose'); 
var fs = require('fs');
var path =require('path');
var async = require('async');
    app = app();

require('./db')(app, mongoose);

var models_path = __dirname + '/models';

fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
});

var JKPost = require('./websites/JKPost');
var JKGlobe = require('./websites/TheJakartaGlobe');
var Detik = require('./websites/Detik');
var TempoIndo = require('./websites/tempo'); // gets the indonesian news 
var TempoEn = require('./websites/TempoEnglish');
var BeritaSatu = require('./websites/BeritaSatu');
var Viva = require('./websites/Viva');
var KapanLagi = require('./websites/Kapanlagi');
var Kompass = require('./websites/Kompass');
// Perform all the scraping asynchronously 

// Viva and Kapanlagi should be expecuted last (Slow response and buggy xml )
var tasksArray = [ JKPost, JKGlobe, Detik, TempoIndo, TempoEn, BeritaSatu, Kompass, Viva, KapanLagi];


var scrapeAsynchronous = function() {

	async.parallel(tasksArray, function(err, resp) {
		console.log('tasks are asynchronously being worked on');	
	});

};

setInterval(scrapeAsynchronous, 20000 ); // scrapes every 20 seconds 

app.listen(6000);  

module.exports = app;