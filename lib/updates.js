var templates = require('duality/templates'),
	Form = require('couchtypes/forms').Form,
	types = require('./types'),
	session = require('session'),
	utils = require('duality/utils'),
	sanitize = require('sanitize'),
	showdown = require('showdown'),
	sdconvert = new showdown.converter(),
	users = require('users');

exports.update_recipe = function(doc,req) {

	if(!req.userCtx.name) {
		throw({unauthorized: "You have to be signed in to create a recipe"});
		log("unauthorized");
	}

	var editForm = new Form(types.recipe);
	editForm.validate(req);

	if (editForm.isValid()) {
		editForm.values['createdBy'] = req['userCtx']['name'];
		editForm.values['ingredientsHTML'] = sdconvert.makeHtml(sanitize.escapeHtml(editForm.values.ingredients));
		editForm.values['preparationHTML'] = sdconvert.makeHtml(sanitize.escapeHtml(editForm.values.preparation));
		return [editForm.values, utils.redirect(req,'/recipe/'+editForm.values._id)];
	}
	else {
		return [null,
			{
			title: "Form invalid",
			activeNew: 1,
			content: templates.render("edit.html", req, {
				method: "POST",
			    action: utils.getBaseURL(req) + "/update_recipe",
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

