var moment = require('moment');
var	query  = require('../lib/db').query;

var Model = module.exports = {}; 

// ---------------------------------------------------------------------------------------------------
var GetPuzzles = Model.GetPuzzles = function(type,callback) {
	query("SELECT * FROM puzzles WHERE type=? ORDER BY id",[type],callback);
};

// ---------------------------------------------------------------------------------------------------
var GetPuzzle = Model.GetPuzzles = function(id,callback) {
	query("SELECT * FROM puzzles WHERE id=?",[id],callback);
};

// ---------------------------------------------------------------------------------------------------
var AddPuzzle = Model.AddPuzzle = function(type,difficulty,date,problem,solution,callback) {
	query("INSERT INTO puzzles(type,difficulty,puzzledate,problem,solution) VALUES(?,?,?,?,?)",[type,difficulty,date,problem,solution],callback);
};
