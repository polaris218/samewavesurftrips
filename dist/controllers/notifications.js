'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notify_newUser = notify_newUser;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
|--------------------------------------------------------------------------
| Configure mail server
|--------------------------------------------------------------------------
*/
var api_key = _config2.default.mailgun.key,
    domain = _config2.default.mailgun.domain,
    mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

/* 
|--------------------------------------------------------------------------
| Send welcome email to new sigups
|--------------------------------------------------------------------------
*/
function notify_newUser(user) {

    var hbs = _expressHandlebars2.default.create();

    hbs.renderView('views/email/newuser-welcome.handlebars', { layout: 'notification', email: user.email, first_name: user.first_name }, function (err, html) {

        var data = {
            html: html,
            from: _config2.default.mailgun.from,
            to: user.email,
            subject: 'Hi ' + user.first_name + ', Welcome to Samewave.'
        };

        mailgun.messages().send(data, function (error, body) {
            console.log('MailSent : newuser-welcome');
        });
    });
}