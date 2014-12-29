#!/usr/bin/env node
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var moment = require('moment');
var secrets = require('../secrets');
var puzzles = require('../models/puzzle');

var program = require('commander');

program
  .version('0.0.1')
  .option('-a, --anagrams', 'Generate Anagrams')
  .option('-m, --arithmetic', 'Generate Arithmetic')
  .parse(process.argv);

var type = {};

if (program.anagrams) {
	type.id=2;
	type.name='anagrams';
	type.title='Anagrams';
}

if (program.arithmetic) {
	type.id=3;
	type.name='arithmetic';
	type.title='Arithmetic';
}

if (!type.id) {
	program.help();
	process.exit();
}

var opts = {pretty:'\t'};
var tmplt = jade.compileFile('../views/'+type.name+'.jade',opts);

puzzles.GetPuzzlesByDate(type.id,function(err,data){
	
	for(var i=0;i<data.length;i++) {
		var record = data[i];
		var filepath = path.normalize(process.cwd() + "/../public/puzzles/");
		var filename = filepath + type.name + moment(record.puzzledate).format("YYYYMMDD") + ".html";

		record.date = moment(record.puzzledate).format("dddd, MMMM Do, YYYY");
		record.title = type.title;
		record.number = i;
		var puzzle = {puzzle:record};
		var html = tmplt(puzzle);
		fs.writeFileSync(filename,html,{encoding:'utf8'});
	};

	process.exit();
	
});