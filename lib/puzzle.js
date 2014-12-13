var model = require('../models/puzzle');

var puzzle = function (type,difficulty,date,problem,solution) {
	this.type = type;
	this.difficulty = difficulty;
	this.date = date;
	this.problem = problem;
	this.solution = solution;
};

puzzle.prototype.serialize = function(){
	return {
		type : this.type,
		difficulty : this.difficulty,
		date : this.date,
		problem : this.problem,
		solution : this.solution
	}
};

puzzle.prototype.deserialize = function(type,difficulty,date,problem,solution){
	this.type = type;
	this.difficulty = difficulty;
	this.date = date;
	this.problem = problem;
	this.solution = solution;
};

puzzle.prototype.save = function(callback){
	model.save(this.serialize(),callback);
};

var p = function(type,difficulty,date,problem,solution) {
	return new puzzle(type,difficulty,date,problem,solution);
};

p.difficulty = {"easy":1,"medium":2,"hard":3,"bonus":4};
p.type = {"chess":1,"jumble":2,"arithmetic":3,"algorithm":4};

module.exports = p;