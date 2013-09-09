var templates = require('duality/templates'),
	utils = require('duality/utils'),
	events = require('duality/events'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	recipe = require('./types').recipe,
	user = require('./types').user,
	db = require('db'),
	myutils = require('./myutils');

exports.edit = function (doc, req) {
	events.once('afterResponse', function (info, req, res) {
		myutils.navbarActive('editNavLink');
	});
	if(req.userCtx.name == null) {
		return {title: "Login required", content: "Only logged in users can create recipes"};
	}

	fork = req.query["fork"] == 1;
	if (doc == null) {
		var title = "New recipe", buttontext="Add recipe";
		var editForm = new Form(recipe);
	}
	else {
		if(fork) {
			var title = "Fork recipe: "+doc.name, buttontext="Fork recipe";
			if(req.client) {
				doc._id = db.newUUID(function(err,response) {
					if(err)
					console.error(err);
					if(response)
					console.log(response)
				});
				doc._rev = null;
			}
		} else {
			var title = "Edit: "+doc.name, buttontext="Change recipe";
		}
		var editForm = new Form(recipe, doc);
	}
    if (req.client && utils.initial_hit && !fork) {
        // dont' bother with the second render, nothing new to show
    }
	else {
		return {title: title, content: templates.render('edit.html',req,{
		   method: "POST",
		   action: utils.getBaseURL(req) + "/update_recipe",
		   form: editForm.toHTML(req),
		   button: buttontext
		}
		)};
	}
}

exports.create_user = function(doc, req) {
	events.once('afterResponse', function (info, req, res) {
		myutils.navbarActive();
	});
	if (req.userCtx.name) {
		return {
			content: "Already logged in"};
	}
	var userForm = new Form(user);
	return {
		title: "Create new user",
		content: templates.render('createUser.html', req, {
			method: "POST",
			action: utils.getBaseURL(req) + "/update_user",
			form: userForm.toHTML(req)
		})
	};
}

exports.recipeshow = function(doc, req) {
	if(doc==null) {
		return {code: 404, error: "not_found", reason: "recipe doesn't exist"};
	}
	events.once('afterResponse', function (info, req, res) {
		myutils.navbarActive();
	});
    if (req.client && utils.initial_hit) {
        // dont' bother with the second render, nothing new to show
    }
	else {

		return {
			title: doc.name,
				content: templates.render("recipeshow.html", req, {
					doc: doc,
				editable: (req.userCtx.name == doc.createdBy)
				})
		};

	}
}
