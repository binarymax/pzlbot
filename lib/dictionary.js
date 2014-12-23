/***************************************************
 *
 * dictionary.js
 *
 * Loads dictionary and definitions into memory
 * Offers functions for finding words and definitions
 *
 ***************************************************/

var fs = require('fs');

var Dictionary = module.exports = {};
var index = {};

//Loads files into memory, prepares hash/cache
Dictionary.load = function(callback) {
	parseDictionary(process.cwd() + '/dict/dict.json', callback);
};

Dictionary.get = function(word) {
	console.log(index[word.toLowerCase()]);
	return index[word.toLowerCase()];
};

Dictionary.each = function(callback) {
	var word;	
	for(word in index) {
		if(index.hasOwnProperty(word)){
			callback(word,index[word]);
		}
	}
}

//Loads an anagram file from disk into memory
function parseDictionary(filename,callback) {

	fs.readFile(filename,'utf8',function(err,raw){
		if (err) throw err;
		var dict = JSON.parse(raw);
		var word;
		var len = 0;
		var reWord = /^[a-z]+$/i;
		for(word in dict) {
			if(dict.hasOwnProperty(word) && reWord.test(word)){
				index[word.toLowerCase()] = dict[word];
				//console.log(word,index[word.toLowerCase()]);
				len++;
			}
		}
		console.log("Loaded",len,'definitions from',filename);
		
		if(callback) callback();

	});

}