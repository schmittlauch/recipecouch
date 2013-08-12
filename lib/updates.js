var templates = require('duality/templates'),
	Form = require('couchtypes/forms').Form,
	recipe = require('./types').recipe;

exports.update_recipe = function(doc,req) {
	var editForm = new Form(recipe);
	editForm.validate(req);

	if (editForm.isValid()) {
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
