"use strict";

var app = require('express');
var mongoose = require('mongoose'); 
var fs = require('fs');
var path =require('path');
    app = app();

require('./db')(app, mongoose);

var models_path = __dirname + '/models';

fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
});

//var JKPost = require('./websites/JKPost');

//JKPost();

var JKGlobe = require('./websites/TheJakartaGlobe');

JKGlobe();

app.listen(3000);  

module.exports = app;