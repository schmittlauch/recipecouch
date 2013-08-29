var session = require('session');

exports.bind = function () {
    $('#logout_link').click(function (ev) {
        ev.preventDefault();
        session.logout();
        return false;
    });
    $('#login_form').submit(function (ev) {
        ev.preventDefault();
        var form = this;
        var throbber_elt = $('.throbber', form).show();
        var username = $('input[name="user"]', form).val();
        var password = $('input[name="pass"]', form).val();
        if (!username) {
            $('.username .errors', form).text('Please enter a username');
            $('.username').addClass('has-error');
        }
        if (!password) {
            $('.password .errors', form).text('Please enter a password');
            $('.password').addClass('has-error');
        }
        if (username && password) {
            session.login(username, password, function (err) {
                if (err) {
                    $('#general_login_errors', form).text(err.toString());
					console.error(err);
                    throbber_elt.hide();
                }
            });
        } else {
            throbber_elt.hide();
        }
        return false;
    });
};
