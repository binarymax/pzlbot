var cron     = require('cron')
  , moment   = require('moment')
  , twitter  = require('./twitter');

var Bot = module.exports = {};

// ------------------------------------------------------------
// Setup daily twitter jobs to run at 8AM, Noon, 4PM, every day
// EST for now.
var setup = Bot.setup = function() {

	var EightAM = '00 00 08 * * *';
	var CronJob = cron.CronJob;
	var job = new CronJob({
		cronTime: EightAM,
		onTick: twitter.post, // Runs every day at 08:00:00 AM.
		start: false,
		timeZone: "America/New_York"
	});
	try {
		job.start();
	} catch(ex) {
		console.log('FAIL! Bot could not be initialized!');
		console.log(ex);
	}
	
};
