/**
 * Bindings to Kanso events
 */

var duality_events = require('duality/events'),
    session = require('session'),
	templates = require('duality/templates'),
    cookies = require('cookies'),
    db = require('db'),
	utils = require('duality/utils'),
    controls = require('./controls');


//This code block is based on duality-contrib-session by Caolan McCahon
var fakeRequest = function (userCtx, callback) {
    db.newUUID(100, function (err, uuid) {
        if (err) {
            return callback(err);
        }
        callback(null, {
            userCtx: userCtx,
            uuid: uuid,
            method: 'GET',
            query: {},
            headers: {},
            path: ['_session'],
            client: true,
            initial_hit: utils.initial_hit,
            cookie: cookies.readBrowserCookies()
        });
    });
};


/**
 * The init method fires when the app is initially loaded from a page rendered
 * by CouchDB.
 */

duality_events.on('init', function () {
    // app initialization code goes here...
	controls.bind();
});



/**
 * The sessionChange event fires when the app is first loaded and the user's
 * session information becomes available. It is also fired whenever a change
 * to the user's session is detected, for example after logging in or out.
 */


//old code
/*session.on('change', function (userCtx, req) {
	console.log("Sessionchange" + req);
	console.log("userCtx: " + JSON.stringify(userCtx));
	return $("#session-menu").html(templates.render("session-menu.html", req || {}, {
		userCtx: userCtx
	}));
});*/

//This code block is based on duality-contrib-session by Caolan McCahon
session.on('change', function (userCtx) {
    fakeRequest(userCtx, function (err, req) {
        if (err) {
            return console.error(err);
        }
        $('#session-menu').html(
			templates.render('session-menu.html', req, userCtx)
        );
        controls.bind();
    });
});

/**
 * The updateFailure event fires when an update function returns a document as
 * the first part of an array, but the client-side request to update the
 * document fails.
 */

duality_events.on('updateFailure', function (err, info, req, res, doc) {
    alert(err.message || err.toString());
});
