exports.recipes = function(doc, req) {
	if(doc.type != "recipe")
		return false;

	return true;
}
