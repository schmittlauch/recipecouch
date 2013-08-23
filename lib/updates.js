var templates = require('duality/templates'),
	Form = require('couchtypes/forms').Form,
	types = require('./types'),
	session = require('session'),
	utils = require('duality/utils');

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
		console.log("Browser: "+ utils.isBrowser());
		log("Browser: "+ utils.isBrowser());
		session.login(form.values.user, form.values.pass, (function(err) {}));
	}
	return [null, utils.redirect(req, "/edit/")];
};
