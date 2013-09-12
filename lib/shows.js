var templates = require('duality/templates'),
	utils = require('duality/utils'),
	events = require('duality/events'),
	fields = require('couchtypes/fields'),
	Form = require('couchtypes/forms').Form,
	widgets = require('couchtypes/widgets'),
	recipe = require('./types').recipe,
	user = require('./types').user,
	db = require('db'),
	sanitize = require('sanitize'),
	showdown = require('showdown'),
	sdconvert = new showdown.converter(),
	myutils = require('./myutils');

exports.edit = function(doc, req) {
	events.once('afterResponse', function (info, req, res) {
		myutils.navbarActive('editNavLink');
		$("#previewbtn").on("click",function(ev) {
			recipedata = {
				"name": $("#id_name").val(),
				"ingredientsHTML": sdconvert.makeHtml(sanitize.escapeHtml($("#id_ingredients").val())),
				"preparationHTML": sdconvert.makeHtml(sanitize.escapeHtml($("#id_preparation").val())),
				"tags": function() {
					var tagarr = $("#id_tags").val().split(",");
					for(var i=0;i<tagarr.length;i++) {
						tagarr[i] =tagarr[i].trim();
					}
					return tagarr;
				},
				"createdBy": req.userCtx.name
			};
			var alertdiv = $("<div>"), closebutton = $("<button>"), recprev = $("#recipepreview");
			alertdiv.addClass("alert fade in");
			closebutton.addClass("close");
			closebutton.attr("aria-hidden","true");
			closebutton.attr("data-dismiss","alert");
			closebutton.text("×");
			alertdiv.append(closebutton);
			alertdiv.append(templates.render("recipeshow.html",req,{doc: recipedata, noBtn: true}));
			recprev.append(alertdiv);
			ev.preventDefault();
		});
	});
	if(req.userCtx.name == null) {
		return {title: "Login required", content: "Only logged in users can create recipes"};
	}

	fork = req.query["fork"] == 1;
	if (doc == null) {
		var title = "New recipe", buttontext="Add recipe";
		var editForm = new Form(recipe);
	}
	else {
		if(fork) {
			var title = "Fork recipe: "+doc.name, buttontext="Fork recipe";
			if(req.client) {
				doc._id = db.newUUID(function(err,response) {
					if(err)
					console.error(err);
					if(response)
					console.log(response)
				});
				doc._rev = null;
			}
		} else {
			var title = "Edit: "+doc.name, buttontext="Change recipe";
		}
		var editForm = new Form(recipe, doc);
	}
    if (req.client && utils.initial_hit && !fork) {
        // dont' bother with the second render, nothing new to show
    }
	else {
		return {title: title, content: templates.render('edit.html',req,{
		   method: "POST",
		   action: utils.getBaseURL(req) + "/update_recipe",
		   form: editForm.toHTML(req),
		   button: buttontext
		}
		)};
	}
}

exports.create_user = function(doc, req) {
	events.once('afterResponse', function (info, req, res) {
		myutils.navbarActive();
	});
	if (req.userCtx.name) {
		return {
			content: "Already logged in"};
	}
	var userForm = new Form(user);
	return {
		title: "Create new user",
		content: templates.render('createUser.html', req, {
			method: "POST",
			action: utils.getBaseURL(req) + "/update_user",
			form: userForm.toHTML(req)
		})
	};
}

exports.recipeshow = function(doc, req) {
	if(doc==null) {
		return {code: 404, error: "not_found", reason: "recipe doesn't exist"};
	}
	events.once('afterResponse', function (info, req, res) {
		myutils.navbarActive();
	});
    if (req.client && utils.initial_hit) {
        // dont' bother with the second render, nothing new to show
    }
	else {

		return {
			title: doc.name,
				content: templates.render("recipeshow.html", req, {
					doc: doc,
				editable: (req.userCtx.name == doc.createdBy)
				})
		};

	}
}

exports.search = function(doc, req) {
	var squery = req.query.squery;
	events.once('afterResponse', function(info, req, res) {
		if(squery) {
			resultcontainer = $("#results");
			$.getJSON("/_fti/local/recipes/_design/recipe-couch/recipes",{q: "name:"+squery}, function(data, textStatus, jqXHR) {
				console.log(data);
				if(data.total_rows>0) {
					for(var i=0;i<data.rows.length;i++) {
						resultdiv = $("<div>").addClass("result").html('<a href="'+utils.getBaseURL(req)+'/recipe/'+data.rows[i].id+'">'+data.rows[i].fields.name+'</a> by '+data.rows[i].fields.by);
						resultcontainer.append(resultdiv);
					}
				}
				else {
					resultcontainer.text("No results");
				}
			});
		}
	});
	return {
		title: "Search",
			content: templates.render("search.html", req, {
				value: squery,
			})
	};
};
