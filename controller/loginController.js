const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
async function loginUser(req, res) {
	try {
		const { email, password } = req.body;
		let user = await userModel.findOne({ email });
		if (user) {
			const v = await bcrypt.compare(password, user.password);
			if (v) {
				res.status(200).json({
					status: "ok",
					message: "successfully login",
					data: user,
				});
			} else {
				res.status(404).json({
					status: "error",
					message: "Wrong Password. check your password ",
					data: req.body,
				});
			}
		} else {
			res.status(404).json({
				status: "error",
				message: "User with this email or password not exist",
				data: req.body,
			});
		}
	} catch (err) {
		res.status(302).json({
			status: "error",
			message: err.message,
			data: req.body,
		});
	}
}

module.exports = {
	loginUser,
};
