#!/usr/bin/env node
var moment = require('moment');
var secrets = require('../secrets');
var p = require('../lib/puzzle');
var a = require('../lib/anagrams');

var loaded = false;

//Gets a random integer from 1 to max
var rand = function(max) {
	return Math.floor(Math.random() * max) + 1;
};

//Gets a random set of anagrams of length 
var getset = function(j,k,l) {
	var group = a.filter(j).concat(a.filter(k));
	var index = 0;
	var words = [];
	for(var i=0;i<l;i++) {

		//Grab a random anagram
		index = rand(group.length);
		words.push(group[index]);

		//Remove the item to prevent duplicates
		group.splice(index,1);

	}
	return words;
};

//Quits the program when all async callbacks have been called
var async = (function(){
	var total = 0;
	var done  = 0;
	return function() {
		++total;
		console.log('Total:',total);
		return function() {
			++done;
			console.log('Done:',done);
			if(done===total) process.exit();
		}
	}
})();

//Generates the easy, medium, and hard puzzles for one year
var generate = function() {

	var date = moment();
	var days = 365;

	var easy = getset(4,5,days);
	var medium = getset(6,7,days);
	var hard = getset(8,9,days);

	console.log(easy.length);

	date.set('year', 2014);
	date.set('month', 0);
	date.set('date', 1);

	for(var i=0;i<days;i++) {

		var e = easy[i];
		var m = medium[i];
		var h = hard[i];
		var d = date.format('YYYY-MM-DD');

		var ep = p(p.type.jumble, p.difficulty.easy, d, e.letters, e.words[0]);
		var mp = p(p.type.jumble, p.difficulty.medium, d, m.letters, m.words[0]);
		var hp = p(p.type.jumble, p.difficulty.hard, d, h.letters, h.words[0]);

		ep.save(async());
		mp.save(async());
		hp.save(async());

		date.add(1,'days');

	};

};

//console.log('Generation is complete!!!');
//process.exit();
a.load(generate);