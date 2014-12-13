var puzzle = require('./puzzle');

var Arithmetic = module.exports = function(type,difficulty) {
	switch (type) {
		case 'additive' : return additive(difficulty);
		case 'multiplicative' : return additive(difficulty);
	};
};

var rand = function(max) {
	return Math.floor(Math.random() * max) + 1;
};

var additive = function(difficulty) {
	var max = Math.pow(10,difficulty);
	max += Math.ceil(max/3);
	var problem = [];
	var solution = 0;
	var x = 0;
	for(var i=0;i<8;i++) {
		x = rand(max);
		solution += x;
		problem.push(x);
	}
	problem = problem.join(' + ');
	return {problem:problem,solution:solution};
};

var multiplicative = function() {
	
};