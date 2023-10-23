const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function loginUser(req, res) {
	try {
		const { email, password } = req.body;
		let user = await userModel.findOne({ email });
		if (user) {
			const v = await bcrypt.compare(password, user.password);
			if (v) {
				let token = GenerateToken(user);
				res.status(200).json({
					status: "ok",
					message: "successfully login",
					token: token,
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
function GenerateToken(user) {
	const payload = {
		role: user.role,
		id: user._id,
	};

	const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
	return token;
}
