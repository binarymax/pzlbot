#!/usr/bin/env node
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var moment = require('moment');
var dictionary = require('../lib/dictionary');

var opts = {pretty:'\t'};
var tmplt = jade.compileFile('../views/definition.jade',opts);

dictionary.load(function(){

	var filepath = path.normalize(process.cwd() + "/../public/definitions/");
	var reWord = /^[a-z]+$/i;

	dictionary.each(function(word,text){
		
		if(reWord.test(word)) {
			var definition = {definition:{word:word,text:text}};
			var filename = filepath + "word" + word.toLowerCase() + ".html";
			var html = tmplt(definition);
			//fs.writeFileSync(filename,html,{encoding:'utf8'});
		}

	});

	process.exit();

});