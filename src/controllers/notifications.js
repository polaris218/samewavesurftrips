import config from '../config';
import handlebars from 'express-handlebars';

/* 
|--------------------------------------------------------------------------
| Configure mail server
|--------------------------------------------------------------------------
*/
const api_key = config.mailgun.key,
    domain = config.mailgun.domain,
    mailgun = require('mailgun-js')({
        apiKey: api_key,
        domain: domain
    });

/* 
|--------------------------------------------------------------------------
| Send welcome email to new sigups
|--------------------------------------------------------------------------
*/
export function notify_newUser(user) {

    const hbs = handlebars.create({
        partialsDir: 'views/partials'
    });

    hbs.renderView(`views/email/newuser-welcome.handlebars`, {
        layout: 'notification',
        email: user.email,
        first_name: user.first_name
    }, function (err, html) {

        var data = {
            html: html,
            from: config.mailgun.from,
            to: user.email,
            subject: `Hi ${user.first_name}, Welcome to Samewave.`
        };

        mailgun.messages().send(data, function (error, body) {
            console.log('MailSent : newuser-welcome');
        });

    });

}

/* 
|--------------------------------------------------------------------------
| Send Forgot Email To User
|--------------------------------------------------------------------------
*/
export function notify_forgot(user,url) {

    const hbs = handlebars.create({
        partialsDir: 'views/partials'
    });

    hbs.renderView(`views/email/forgot-password.handlebars`, {
        layout: 'notification',
        url:url,
        first_name: user.first_name
    }, function (err, html) {
        var data = {
            html: html,
            from:config.mailgun.from,
            to: user.email,
            subject: `Hi ${user.first_name}, Forgot Password to Samewave.`
        };

        mailgun.messages().send(data, function (error, body) {
            console.log('MailSent :Forgot-Password run body=',body);
            console.log('MailSent :Forgot-Password run');
        });

    });

}

/* 
|--------------------------------------------------------------------------
| Send trip join notification
|--------------------------------------------------------------------------
*/
export function notify_tripjoin(user) {

    const hbs = handlebars.create();

    hbs.renderView(`views/email/trip-joined.handlebars`, {
        layout: 'notification'
    }, function (err, html) {

        var data = {
            html: html,
            from: config.mailgun.from,
            to: user.email,
            subject: `A new user has joined your trip.`
        };

        mailgun.messages().send(data, function (error, body) {
            console.log('MailSent : trip-joined');
        });

    });

}