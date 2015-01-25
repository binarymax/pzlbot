var twit = require('twit');
var utils = require('./utils');
var scrt = require('../secrets.js');
var bot  = new twit(scrt._twitter);

var Twitter = module.exports = {};

var greetings = [
	"",
	"Good morning! ",
	"Rise and shine. ",
	"Coffee time. ",
	"Get ready...",
	"Nice to see you. ",
	"The world is happy to see you. ",
	"A hot cup of Hello. ",
	"Hope your shower was warm. ",
	"Ah, a fresh day! ",
	"A brand new day awaits. ",
	"Good to see you. ",
	"Hello. ",
	"Hi! ",
	"Howdy. ",
	"Good day! ",
	"You are all kinds of awesome. ",
	"Today never saw you coming. "
];

var messages = [
	"",
	"Ready for some #Anagrams? ",
	"Your daily #puzzles await. ",
	"Unscrambling #letters prepares you for what's ahead. ",
	"Solving #puzzles in the morning is part of a balanced #brain. ",
	"Warm up your #brain. ",
	"Solve solve #solve. ",
	"Ready to go? ",
	"You are so ready for these #puzzles. ",
	"Go get 'em tiger. ",
	"You got these. ",
	"Attack these #puzzles. ",
	"You need to #solve these. ",
	"Your #challenge awaits. ",
	"Solving these #puzzles will be the hardest thing you do today. ",
	"Enjoy these #artisinal hand-crafted all-natural gluten-free #puzzles. "
];

var finales = [
	"",
	"",
	"",
	"Good luck. ",
	"No sweat. ",
	"I know you're ready. "
];

var rand = function(x) {
	return Math.floor(Math.random()*x);
}

var talk = Twitter.talk = function(){
	var message = "";
	var g = rand(greetings.length);
	var m = rand(messages.length);
	var f = rand(finales.length);

	if (!g && !m) m = rand(messages.length-1)+1;

	message += greetings[g];
	message += messages[m];
	message += finales[f];
	message += "\n";

	return message;
};

Twitter.post = function(){
	var id = utils.dateToId();
	if (id) {
		var url = "http://pzlbot.com/j/" + id.toString();
		var msg = talk() + url;
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