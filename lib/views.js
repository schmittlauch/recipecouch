exports.recipes_by_name = {
	map: function(doc) {
		if (doc.type == "recipe") {
			emit([doc.name[0].toLocaleUpperCase(),doc.name], null);
		}
	}
};

exports.random_recipe = {
	map: function(doc) {
		if (doc.type == "recipe" && doc.rand) {
			emit(doc.rand, doc.name);
		}
	},
	reduce: "_count"
};

exports.tags = {
	map: function(doc) {
		if(doc.type == "recipe" && doc.tags) {
			for(var i=0; i<doc.tags.length;i++) {
				emit([doc.tags[i][0].toLocaleUpperCase(),doc.tags[i]],doc.name);
			}
		}
	},
	reduce: "_count"
};

