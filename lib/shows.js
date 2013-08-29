var templates = require('duality/templates'),
	utils = require('duality/utils'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	recipe = require('./types').recipe,
	user = require('./types').user;

exports.edit = function (doc, req) {
	if (doc == null) {
		var title = "Neues Rezept", buttontext="Rezept hinzufügen";
	}
	else {
		var title = "Dokument", buttontext="Rezept ändern";
	}
	var editForm = new Form(recipe);
	return {title: title, activeNew:1, content: templates.render('edit.html',req,{
		titletext: title,
		   method: "POST",
		   action: "../update_recipe",
		   form: editForm.toHTML(req),
		   button: buttontext
	}
	)};
}

exports.create_user = function(doc, req) {
	if (req.userCtx.name) {
		return {
			content: "Already logged in"};
	}
	var userForm = new Form(user);
	return {
		title: "Create new user",
		content: templates.render('createUser.html', req, {
			method: "POST",
			action: utils.getBaseURL() + "/update_user",
			form: userForm.toHTML(req)
		})
	};
}

