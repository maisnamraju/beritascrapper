"use strict";

var app = require('express');
var mongoose = require('mongoose'); 
var fs = require('fs');
    app = app();

require('./db')(app, mongoose);

var models_path = __dirname + '/models';


//console.log(fs.readFile('../models/News.js') );

fs.readdirSync(models_path).forEach(function (file) {
  
  if (~file.indexOf('.js'))  { 
  
  	 	require(models_path + '/' + file);

   }

});


var JKPost = require('./websites/JKPost.js');


JKPost();


app.listen(3000);  

module.exports = app;