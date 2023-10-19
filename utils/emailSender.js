const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
	port: 587,
	host: "smtp.gmail.com",
	secure: false,
	auth: {
		user: "amadirfan443@gmail.com",
		pass: "pnwpuqziaozgjqkk",
	},
});

async function sendEmail(email, subject, body) {
	console.log("email sending");
	try {
		let emailId = await transport.sendMail({
			from: "AmadIrfan <amadirfan443@gmail.com>",
			to: email,
			subject: `${subject} `,
			html: `<p> <h3>${body}</h2></p>`,
		});

		return "email sent";
	} catch (err) {
		return err.message;
	}
}

module.exports = {
	sendEmail,
};
