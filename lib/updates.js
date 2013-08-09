var templates = require('duality/templates'),
	Form = require('couchtypes/forms').Form,
	recipe = require('./types').recipe;

exports.update_recipe = function(doc,req) {
	var editForm = new Form(recipe);
	editForm.validate(req);

	if (editform.isValid()) {
		return {
			title: "Validform",
			content:"<h1>Yeah, valid!</h1>"
		};
	}
	else {
		return {
			title: "Form invalid",
			activeNew: 1,
			content: templates.render("edit.html", req, {
				method: "POST",
				action: "../_update/update_recipe",
				form: editForm.toHTML(req),
				button: "Rezept hinzufügen"
			})
		};
	}
};
