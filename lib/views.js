exports.recipelist = {
	map: function(doc) {
		if (doc.type == "recipe") {
			emit(doc.name, null);
		}
	}
};
