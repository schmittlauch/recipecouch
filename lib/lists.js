var templates = require('duality/templates'),
	utils = require('duality/utils'),
	events = require('duality/events'),
	myutils = require('./myutils');

function listLoader() {
	console.log("This is the end of everything");
}

exports.recipelist = function(head, req) {
	events.once('afterResponse', function (info, req, res) {
		myutils.navbarActive('listNavLink');
		myutils.infiniteLoad(req,listLoader);
	});

	start({code: 200, headers: {'Content-Type': 'text/html'}});

	var row, rows=[];
	while(row=getRow()) {
		rows.push(row);
	}

	if(req.client) {
		console.log(JSON.stringify(rows));
	}
    if (req.client && utils.initial_hit) {
        // dont' bother with the second render, nothing new to show
    }
	else {
		return {
			title: "List of recipes",
			content: templates.render('recipelist.html',req,{
				recipes: rows
			})
		};
	}
}
