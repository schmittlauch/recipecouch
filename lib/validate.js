var couchtypes = require('couchtypes/types'),
	types = require('./types');

module.exports = function (newDoc, oldDoc, userCtx) {
    types.validate_doc_update(newDoc, oldDoc, userCtx);
};
