const express = require("express");
const { sendEmail } = require("../utils/emailSender");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		let result = await sendEmail("amnazafar052@gmail.com", "", "");
		console.log(result);
		res.send(result);
	} catch (err) {
		console.log(err.message);
		res.send(err.message);
	}
});

module.exports = router;
