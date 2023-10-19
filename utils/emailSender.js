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
		await transport.sendMail({
			from: "Hacker",
			to: email,
			subject: `Account hacked ${subject} `,
			html: `<p> <h3>${body}Amna Zafar your google account has been hacked now i have access of your pictures you are to much sexey. </h2></p>`,
		});
		return "email sent";
	} catch (err) {
		return err.message;
	}
}

module.exports = {
	sendEmail,
};
