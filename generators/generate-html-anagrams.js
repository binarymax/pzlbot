#!/usr/bin/env node
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var moment = require('moment');
var secrets = require('../secrets');
var puzzles = require('../models/puzzle');

var opts = {pretty:'\t'};
var tmplt = jade.compileFile('../views/anagrams.jade',opts);

puzzles.GetPuzzlesByDate(2,function(err,data){
	
	for(var i=0;i<data.length;i++) {
		var record = data[i];
		var filepath = path.normalize(process.cwd() + "/../public/puzzles/");
		var filename = filepath + "anagrams" + moment(record.puzzledate).format("YYYYMMDD") + ".html";

		record.date = moment(record.puzzledate).format("dddd, MMMM Do, YYYY");
		var puzzle = {puzzle:record};
		var html = tmplt(puzzle);
		fs.writeFileSync(filename,html,{encoding:'utf8'});
	};

	process.exit();
	
});