"use strict";

var should = require('should');
var utils = require('../lib/utils');

describe('Utils',function() {

	it('should get an Id from a Date',function(){

		var id = utils.dateToId('2014-01-11');
		id.should.equal(10);

	});

	it('should get a Date from an Id',function(){

		var dt = utils.idToDate('10');
		dt.should.equal('20140111');

	});

});