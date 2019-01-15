import config from '../config';

const api_key = config.mailgun.key,
	  domain = config.mailgun.domain,
      mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
        
export function notify_newUser(user, res){

    res.render('email/newuser-welcome', { layout:'notification', email: user.email, first_name: user.first_name }, function(err, html){

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