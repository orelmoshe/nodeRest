import nodemailer from 'nodemailer';

import { config } from '../config';

let transport = nodemailer.createTransport({
	host: config.MAIL_SERVICE,
	port: 465, //if secure is false, it uses 587, by default, and 465 if true
	auth: {
		user: config.MAIL_USER,
		pass: config.MAIL_PASSWORD,
	},
});

export const sendMail = (mailOptions) => {
	return new Promise(async (resolve, reject) => {
		transport.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(`Failed to send email, Error: ${err}`);
				reject(err);
			} else {
				console.log(`Success to send email, info: ${info}`);
				resolve(info.response);
			}
		});
	});
};
