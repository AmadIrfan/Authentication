const express = require("express");
const { sendEmail } = require("../utils/emailSender");
const router = express.Router();

router.get("/:email", async (req, res) => {
	try {
		const { email } = req.params;
		let result = await sendEmail(
			email,
			"Register successfully",
			"You have been registered successfully in Authentication system. Please verify your email click on <a href='http://localhost:3000/verify/65315dca63ebb36353a5ca52'>verify</a>"
		);
		res.send(result);
	} catch (err) {
		res.send(err.message);
	}
});

module.exports = router;
