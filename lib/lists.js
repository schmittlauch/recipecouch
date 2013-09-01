var templates = require('duality/templates'),
	utils = require('duality/utils'),
	events = require('duality/events'),
	myutils = require('./myutils');

exports.recipelist = function(head, req) {
	myutils.navbarActive('listNavLink');

	start({code: 200, headers: {'Content-Type': 'text/html'}});

	var row, rows=[];
	while(row=getRow()) {
		rows.push(row);
	}

	console.log(JSON.stringify(rows));
	return {
		title: "List of recipes",
		content: templates.render('recipelist.html',req,{
			recipes: rows
		})
	};
}
