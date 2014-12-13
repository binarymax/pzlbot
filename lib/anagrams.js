/***************************************************
 *
 * anagrams.js
 *
 * Loads dictionary and anagrams into memory
 * Offers functions for finding words and anagrams
 *
 ***************************************************/

var fs = require('fs');

var Anagrams = module.exports = {};
var index = [];

//Loads files into memory, prepares hash/cache
Anagrams.load = function(callback) {
	parseAnagrams('../dict/anagrams.txt', index, callback);
};

Anagrams.filter = function(length) {
	if (!index.length) throw 'Error: index not yet loaded';
	var set = [];
	for(var i=0;i<index.length;i++) {
		var ana = index[i];
		if (ana.length === length && ana.words.length === 1) set.push(ana);
	}
	return set;
};

//Loads an anagram file from disk into memory
function parseAnagrams(filename,index,callback) {

	fs.readFile(filename,'utf8',function(err,raw){
		
		if (err) throw err;
		var rows = raw.split('\n');
		var word = /^[a-z]+$/;
		for(var i=0,l=rows.length;i<l;i++) {
			var row = rows[i];
			var terms = row.split('\t');
			if (word.test(terms[0])) {
				var chars = terms[0];
				var words = terms.slice(1);
				var object = {
					letters : chars,
					length : chars.length,
					words : words
				};
				index.push(object);
			}
		}
		
		console.log("Loaded",index.length,'anagrams from',filename);
		
		callback();

	});

}