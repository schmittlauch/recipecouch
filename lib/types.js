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
		ingredientsHTML: fields.string({
			required: false,
			widget: widgets.hidden()
		}),
		preparation: fields.string({
			widget: widgets.textarea({rows:5,classes:["form-control"]}),
			required:false
		}),
		preparationHTML: fields.string({
			required: false,
			widget: widgets.hidden()
		}),
		tags: fields.array({
			required: false,
			hint:"Tags should be comma separated",
			widget: widgets.text({classes: ["form-control"]})}),
		createdAt: fields.createdTime({
			widget: widgets.hidden()}),
		createdBy: fields.string({
			required: false,
			widget: widgets.hidden()}),
		rand: fields.number({
			required: false,
			widget: widgets.hidden()
		})
	}/*,
	permissions: {
		add: permissions.hasRole("user")
	}*/
});

exports.login = new Type('login', {
	fields: {
		username: fields.string(),
		password: fields.string({
			widget: widgets.password()})
	}
});

exports.user = new Type('user', {
	fields: {
		username: fields.string({
			widget: widgets.text({
				classes:["form-control"]})
		}),
		password: fields.string({
			widget: widgets.password({
				classes:["form-control"]})}),
		email: fields.email({
			widget: widgets.text({
				classes:["form-control"]})
		})
	}
});
