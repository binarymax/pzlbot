var moment = require('moment');
var heimdall = require('heimdall');
var dictionary = require('../lib/dictionary');
	dictionary.load();

var Routes = module.exports = {};

Routes.init = function(app) {

	heimdall.load(process.cwd() + '/api/',app);

	app.get('/j',function(req,res){
		var date = moment().format('YYYYMMDD'); //20150101
		res.sendfile('public/puzzles/anagrams'+date+'.html');
	});

	app.get('/j/:num',function(req,res){
		var num  = parseInt(req.params.num);
		
		if (isNaN(num)) {
			res.status(404).render('error');
			return;
		}
		
		var date = moment([2014,0,1]).add(num,'days');
		
		var isok = date.isAfter(moment()) ? false : true;

		if (!isok) {
			res.status(404).render('error');
			return;
		}

		date = date.format('YYYYMMDD');
		res.sendfile('public/puzzles/anagrams'+date+'.html');
	});

	app.get('/d/:word',function(req,res){

		var word = req.params.word.toLowerCase();
		console.log(word);
		console.log(dictionary.get('Zythem'));
		var definition = {
			pretty:'\t',
			data:{
				word:word,
				text:dictionary.get(word),
				date:moment().format("dddd, MMMM Do, YYYY")
			}
		}
		res.render('definition',definition);
		//res.sendfile('public/definitions/word'+req.params.word+'.html');
	});



};