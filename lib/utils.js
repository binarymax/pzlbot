var moment = require('moment');

var Utils = module.exports = {};

Utils.idToDate = function(id) {
	var num = parseInt(id);
	
	if(isNaN(num)) return null;

	var date = moment([2014,0,1]).add(num,'days');
	var isok = date.isAfter(moment()) ? false : true;

	if (!isok) return null;

	return date.format('YYYYMMDD');
};

Utils.dateToId = function(date) {
	var orig = moment([2014,0,1]);
	var date = moment(date||(new Date()));
	var isok = date.isAfter(orig) ? true : false;

	if (!isok) return null;

	return date.diff(orig,'days');
};