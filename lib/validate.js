var couchtypes = require('couchtypes/types'),
	types = require('./types');

module.exports = function (newDoc, oldDoc, userCtx) {
    couchtypes.validate_doc_update(types,newDoc, oldDoc, userCtx);
	if(newDoc.type == "recipe") {
		if(oldDoc && newDoc.user != oldDoc.user) {
			throw({forbidden: "A recipe can only be edited ny it's creator. Try forking it"});
		}
	}
};
