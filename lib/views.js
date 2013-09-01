exports.recipes_by_name = {
	map: function(doc) {
		if (doc.type == "recipe") {
			emit(doc.name, null);
		}
	}
};
