module.exports = {
	"recipes": {
		"index": function(doc) {
			var ret = new Document();
			if(doc.type == "recipe") {
				ret.add(doc.name, {field: "name", store: "yes"});
				ret.add(doc.ingredients, {field: "recipedata"});
				ret.add(doc.preparation, {field: "recipedata"});
				ret.add(doc.createdBy, {field: "by", index: "not_analyzed", store: "yes"});
			}
			return ret;
		}
	}/*,
	"all": {
		"index": function(doc) {
			var ret = new Document();

			function idx(obj) {
				for (var key in obj) {
					switch (typeof obj[key]) {
						case 'object':
							idx(obj[key]);
							break;
						case 'function':
							break;
						default:
							ret.add(obj[key]);
							break;
					}
				}
			};

			idx(doc);

			if (doc._attachments) {
				for (var i in doc._attachments) {
					ret.attachment("default", i);
				}
			}

			return ret;
		}
	}*/
};
