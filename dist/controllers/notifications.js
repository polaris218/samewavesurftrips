'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notify_newUser = notify_newUser;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api_key = _config2.default.mailgun.key,
    domain = _config2.default.mailgun.domain,
    mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

function notify_newUser(email, res) {

    console.log(email);

    res.render('email/newuser-confirm', { email: email }, function (err, html) {
        console.log(err);

        var data = {
            html: html,
            from: _config2.default.mailgun.from,
            to: email,
            subject: 'Please confirm your email account'
        };

        mailgun.messages().send(data, function (error, body) {
            console.log('MailSent : newuser-confirm');
            console.log(error);
        });
    });
}