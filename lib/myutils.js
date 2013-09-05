var events = require('duality/events');

exports.navbarActive = function(id) {
	$('#topnav li').removeClass('active');
	if(id) {
		$('#' + id).addClass('active');
	}
}

exports.infiniteLoad = function(req,contentfunc) {
	if(req.client) {
		console.log("Scrolling in the browser");
		$(window).scroll(function(){
			if  ($(window).scrollTop() == $(document).height() - $(window).height()){
				contentfunc();
			}
		});
	}
	else {
		log("Not scrolling in da browser");
	}
}
