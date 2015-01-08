var twit = require('twit');
var utils = require('./utils');
var scrt = require('../secrets.js');
var bot  = new twit(scrt._twitter);

var Twitter = module.exports = {};

Twitter.post = function(){
	var id = utils.dateToId();
	if (id) {
		var url = "http://pzlbot.com/j/" + id.toString();
		var msg = "Today's anagram puzzles are ready!\n" + url;
		bot.post('statuses/update', { status: msg }, function(err, data, response) {
	  		if(err) {
	  			console.log('ERROR!');
	  			console.log(err);
	  		} else {	  			
	  			console.log('SUCCESS! Tweet posted for',url);
	  		}
		});
	}
};