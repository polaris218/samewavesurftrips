'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.emailSendReferFriend = emailSendReferFriend;
exports.emailSendNewOrder = emailSendNewOrder;
exports.emailSendSignupOffer = emailSendSignupOffer;
exports.emailSendManifestProcessing = emailSendManifestProcessing;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api_key = _config2.default.mailgun_key,
    domain = _config2.default.mailgun_domain,
    mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

/* 
|--------------------------------------------------------------------------
| send refer to friend email
|--------------------------------------------------------------------------
*/
function emailSendReferFriend(from, to, res) {
	res.render('email/refer-friend', { layout: 'email', from: from, to: to, url: _config2.default.shop_url }, function (err, html) {
		var data = {
			from: _config2.default.mailgun_from,
			to: to,
			subject: 'Get 15% off your next order!',
			html: html
		};

		mailgun.messages().send(data, function (error, body) {
			console.log('MailSent');
		});
	});
}

/* 
|--------------------------------------------------------------------------
| send new order notification email
|--------------------------------------------------------------------------
*/
function emailSendNewOrder(res) {

	res.render('email/email-neworder', { layout: 'email' }, function (err, html) {

		_config2.default.emails.order_notifications.forEach(function (email_to) {

			var data = {
				from: _config2.default.mailgun_from,
				to: email_to,
				subject: 'You have a new order!',
				html: html
			};

			mailgun.messages().send(data, function (error, body) {
				console.log('MailSent');
			});
		}, this);
	});
}

/* 
|--------------------------------------------------------------------------
| maillist signup offer
|--------------------------------------------------------------------------
*/
function emailSendSignupOffer(to, res) {

	res.render('email/email-newsignup-offer', { layout: 'email' }, function (err, html) {

		var data = {
			from: _config2.default.mailgun_from,
			to: to,
			subject: 'Thank you for joining AGT!',
			html: html
		};

		mailgun.messages().send(data, function (error, body) {
			console.log('MailSent');
		});
	});
}

/* 
|--------------------------------------------------------------------------
| manifest processing
|--------------------------------------------------------------------------
*/
function emailSendManifestProcessing(to, xml) {
	var data = {
		from: _config2.default.mailgun_from,
		to: to,
		subject: 'Todays manifest has been sent',
		html: '<p>Todays manifest: </p><pre>' + xml + '</pre>'
	};

	mailgun.messages().send(data, function (error, body) {
		console.log('MailSent');
	});
}