var model = require('../models/puzzle');

var puzzle = function (type,difficulty,date,problem,solution) {
	this.type = type;
	this.difficulty = difficulty;
	this.date = date;
	this.problem = problem;
	this.solution = solution;
};

puzzle.prototype.save = function(callback){
	model.AddPuzzle(this.type,this.difficulty,this.date,this.problem,this.solution,callback);
};

var p = function(type,difficulty,date,problem,solution) {
	return new puzzle(type,difficulty,date,problem,solution);
};

p.difficulty = {"easy":1,"medium":2,"hard":3,"bonus":4};
p.type = {"chess":1,"jumble":2,"arithmetic":3,"algorithm":4};

module.exports = p;