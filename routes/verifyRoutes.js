const express = require("express");
const userModels = require("../models/userModels");
const { sendEmail } = require("../utils/emailSender");
const router = express.Router();

router.get("/:id", async (req, res) => {
	try {
		let { id } = req.params;
		let user = await userModels.findByIdAndUpdate(id, {
			$set: { isVerified: true },
		});
		if (!user.isVerified) {
			res.status(200).send({
				status: "ok",
				message: "successfully Verified your Email ...",
				data: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					dateOfBirth: user.dateOfBirth,
				},
			});
		} else {
			res.status(200).send({
				status: "ok",
				message: "Email is Already verified.",
				data: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					dateOfBirth: user.dateOfBirth,
				},
			});
		}
		await sendEmail(
			user.email,
			"Email Verified",
			"successfully Verified your Email ..."
		);
	} catch (err) {
		res.status(505).send({
			status: "error",
			message: "internal server error ",
			data: null,
		});
	}
});

module.exports = router;
