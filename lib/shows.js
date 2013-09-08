var templates = require('duality/templates'),
	utils = require('duality/utils'),
	events = require('duality/events'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	recipe = require('./types').recipe,
	user = require('./types').user,
	myutils = require('./myutils');

exports.edit = function (doc, req) {
	events.once('afterResponse', function (info, req, res) {
		myutils.navbarActive('editNavLink');
	});
	if (doc == null) {
		var title = "Neues Rezept", buttontext="Rezept hinzufügen";
	}
	else {
		var title = "Dokument", buttontext="Rezept ändern";
	}
	var editForm = new Form(recipe);
	return {title: title, content: templates.render('edit.html',req,{
	   method: "POST",
	   action: utils.getBaseURL(req) + "/update_recipe",
	   form: editForm.toHTML(req),
	   button: buttontext
	}
	)};
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

	return {
		title: doc.name,
		content: templates.render("recipeshow.html", req, {
			doc: doc
		})
	};

};
