var heimdall = require('heimdall');

var Routes = module.exports = {};

Routes.init = function(app) {
	//heimdall.load(process.cwd() + '/api/',app);
	app.get('/m',function(req,res){res.sendfile('public/arithmetic.html');});

};