var Type = require('couchtypes/types').Type,
	fields = require('couchtypes/fields'),
	widgets = require('couchtypes/widgets'),
	permissions = require('couchtypes/permissions');

exports.recipe = new Type('recipe', {
	fields: {
		name: fields.string({
			widget: widgets.text({classes:["form-control"]})}),
		ingredients: fields.string({
			widget: widgets.textarea({cols:5,rows:5,classes:["form-control"]})
		}),
		preparation: fields.string({
			widget: widgets.textarea({rows:5,classes:["form-control"]})
		}),
		tags: fields.array({
			required: false,
			hint:"Tags should be comma separated",
			widget: widgets.text({classes: ["form-control"]})}),
		createdAt: fields.createdTime({
			widget: widgets.hidden()}),
		createdBy: fields.string({
			required: false,
			widget: widgets.hidden()})
	}/*,
	permissions: {
		add: permissions.hasRole("user")
	}*/
});

exports.login = new Type('login', {
	fileds: {
		user: fields.string(),
		pass: fields.string({
			widget: widgets.password()})
	}
});
