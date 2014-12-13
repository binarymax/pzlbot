var moment = require('moment');
var	query  = require('../lib/db').query;

var Model = module.exports = {}; 

// ---------------------------------------------------------------------------------------------------
var GetPuzzles = Model.GetPuzzles = function(type,callback) {
	query("SELECT * FROM puzzles WHERE type=? ORDER BY id",[type],callback);
};

// ---------------------------------------------------------------------------------------------------
var GetPuzzlesByDate = Model.GetPuzzlesByDate = function(type,callback) {
	var sql = 
		"SELECT " +
		"	e.id as easyid, e.problem as easyproblem, " +
		"	m.id as mediumid, m.problem as mediumproblem, " +
		"	h.id as hardid, h.problem as hardproblem, " +
		"	e.puzzledate as puzzledate " +
		"FROM " +
		"	(SELECT * FROM puzzles WHERE difficulty=1 AND type=?) e INNER JOIN " +
		"	(SELECT * FROM puzzles WHERE difficulty=2 AND type=?) m ON e.puzzledate = m.puzzledate INNER JOIN " +
		"	(SELECT * FROM puzzles WHERE difficulty=3 AND type=?) h ON m.puzzledate = h.puzzledate " +
		"ORDER BY e.puzzledate";
	query(sql,[type,type,type],callback);
};

// ---------------------------------------------------------------------------------------------------
var GetPuzzle = Model.GetPuzzles = function(id,callback) {
	query("SELECT * FROM puzzles WHERE id=?",[id],callback);
};

// ---------------------------------------------------------------------------------------------------
var AddPuzzle = Model.AddPuzzle = function(type,difficulty,date,problem,solution,callback) {
	query("INSERT INTO puzzles(type,difficulty,puzzledate,problem,solution) VALUES(?,?,?,?,?)",[type,difficulty,date,problem,solution],callback);
};
