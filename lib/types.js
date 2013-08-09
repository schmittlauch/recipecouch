var Type = require('couchtypes/types').Type,
	fields = require('couchtypes/fields'),
	widgets = require('couchtypes/widgets');

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
			hint:"Tags should be comma separated",
			widget: widgets.text({classes: ["form-control"]})}),
		createdAt: fields.createdTime({
			widget: widgets.hidden()})
	}
});
