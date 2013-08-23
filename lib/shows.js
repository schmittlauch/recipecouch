var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	recipe = require('./types').recipe;

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
