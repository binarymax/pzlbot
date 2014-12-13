var	mysql	= require('mysql'),
	db_name	= GLOBAL._mysql.db,
	db_user	= GLOBAL._mysql.user,
	db_pass	= GLOBAL._mysql.pass,
	db_host	= GLOBAL._mysql.host,
	client	= mysql.createConnection({user:db_user,password:db_pass,host:db_host});
	client.query('USE ' + db_name);

var db = module.exports = {};

//MySQL query wrapper
var query = db.query = function(sql,params,callback) {
	if (GLOBAL._debugperformance) var start = (new Date())-0;
	client.query(sql,params,function(err,info) {
		if (GLOBAL._debugperformance) { 
			var end = (new Date())-0;
			console.log(end - start + 'ms |',sql);
		}
		if (err) {
			console.log('MySQL Error::',err);
			if (typeof callback === 'function') callback(err,null);
		} else {
			var records = (info instanceof Array)?info:[info];
			if (typeof callback === 'function') callback(err,records);
		}
	});
};