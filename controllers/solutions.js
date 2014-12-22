var model = require('../models/puzzle');

var Solutions = module.exports = {};

Solutions.Check = function(data,callback) {
	model.GetPuzzle(data.id,function(err,records){
		if(err) {
			callback(err);
		} else if (!records || !records.length) {
			callback("Puzzle not found");
		} else if (records[0].solution===data.solution.toLowerCase()) {
			callback(null,{correct:true});
		} else {
			callback(null,{correct:false});
		}
	});
}