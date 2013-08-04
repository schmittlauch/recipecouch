var templates = require('duality/templates'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets');

exports.edit = function (doc, req) {
	if (doc == null) {
		var title = "Neues Rezept", buttontext="Rezept hinzufügen";
	}
	else {
		var title = "Dokument", buttontext="Rezept ändern";
	}
	var editForm = new Form({name: fields.string(), ingredients: fields.string(widget=widgets.textarea()), preparation: fields.string(), tags: fields.array(), creator: fields.creator(), createdAt: fields.createdTime()});
	return {title: title, activeNew:1, content: templates.render('edit.html',req,{
		titletext: title,
		   method: "POST",
		   action: "../_update/update_recipe",
		   form: editForm.toHTML(req),
		   button: buttontext
	}
	)};
}
