var templates = require('duality/templates'),
	Form = require('couchtypes/forms').Form,
	types = require('./types'),
	session = require('session'),
	utils = require('duality/utils'),
	users = require('users');

exports.update_recipe = function(doc,req) {
	var editForm = new Form(types.recipe);
	editForm.validate(req);

	if (editForm.isValid()) {
		editForm.values['createdBy'] = req['userCtx']['name'];
		return [editForm.values, {content:"Yeah, Form valid!", title: "Validform"}];
	}
	else {
		return [null,
			{
			title: "Form invalid",
			activeNew: 1,
			content: templates.render("edit.html", req, {
				method: "POST",
				action: "../_update/update_recipe",
				form: editForm.toHTML(req),
				button: "Rezept hinzufügen"
			})
		}];
	}
};

exports.login = function(doc, req) {
	var form;
	form = new Form(types.login, null, {});
	form.validate(req);

	if (form.values.username && form.values.password) {
		session.login(form.values.username, form.values.password, (function(err) {}));
	}
	return [null, utils.redirect(req, "/edit/")];
};

exports.update_user = function(doc, req) {
	var userForm = new Form(types.user);
	userForm.validate(req);

	if (userForm.isValid()) {
		users.create(userForm.values.username, userForm.values.password,{email:userForm.email}, function(err) {
			if(err) {
				console.error(err);
				return {title: "An error occured", content: err};
			}
		});
		return [null,utils.redirect("/edit")];
	}
	else {
		return [null, {
			title: "Create new user",
			content: templates.render('createUser.html', req, {
				method: "POST",
				action: utils.getBaseURL() + "/update_user",
				form: userForm.toHTML(req)
			})
		}];
	}
};

