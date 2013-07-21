var templates = require('duality/templates');

exports.edit = function (doc, req) {
	if (doc == null) {
		return {title: "Neues Rezept", content: templates.render('edit.html',req,{"titletext": "Neues Rezept"})};
	}
	return {title: "Dokument", content: doc};
}
