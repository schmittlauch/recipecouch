var session = require('session');

exports.bind = function () {
    //$('#session-menu .logout a').click(function (ev) {
    $('#logout_link').click(function (ev) {
        ev.preventDefault();
        session.logout();
        return false;
    });
    $('#login_form').submit(function (ev) {
        ev.preventDefault();
        var form = this;
        //var spinner_elt = $('.spinner', form).show();
        var username = $('input[name="user"]', form).val();
        var password = $('input[name="pass"]', form).val();
        if (!username) {
            //$('.username .errors', form).text('Please enter a username');
            //$('.username').addClass('validation_error');
        }
        if (!password) {
            //$('.password .errors', form).text('Please enter a password');
            //$('.password').addClass('validation_error');
        }
        if (username && password) {
            session.login(username, password, function (err) {
                if (err) {
                    //$('.general_errors', form).text(err.toString());
                    //spinner_elt.hide();
                }
            });
        } else {
            //spinner_elt.hide();
        }
        return false;
    });
};
