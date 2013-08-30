exports.navbarActive = function(id) {
	events.once('afterResponse', function (info, req, res) {
        $('#topnav li').removeClass('active');
		if(id) {
			$('#' + id).addClass('active');
		}
    });
}


