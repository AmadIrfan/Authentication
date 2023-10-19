const userModel = require("../models/userModels");

const encrypt = require("bcrypt");
const { sendEmail } = require("../utils/emailSender");

async function registerUsers(req, res) {
	try {
		let { email } = req.body;
		let userAlreadyExists = await userModel.findOne({ email });
		if (!userAlreadyExists) {
			const hashPassword = await encrypt.hash(req.body.password, 8);
			let createUser = {
				email: req.body.email,
				password: hashPassword,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				dateOfBirth: req.body.dateOfBirth,
				role: req.body.role,
			};
			const data = await userModel.create(createUser);
			// await sendEmail((email, "", ""));
			res.status(201).json({
				status: "ok",
				message: "successfully created",
				data: data,
			});
		} else {
			res.status(302).json({
				status: "error",
				message: "User with this email already exists",
				data: req.body,
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "error",
			message: `internal error  ${err.message}`,
			data: null,
		});
	}
}

async function getUsers(req, res) {
	try {
		const data = await userModel.find();
		res.status(200).json({
			status: "ok",
			message: "success",
			data: data,
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			message: "internal error",
			data: null,
		});
	}
}

async function updateUsers(req, res) {
	try {
		const { id } = req.params;
		const data = await userModel.findByIdAndUpdate(id, req.body);
		res.status(200).json({
			status: "ok",
			message: "successfully updated",
			data: data,
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			message: "internal error",
			data: null,
		});
	}
}

async function deletesUsers(req, res) {
	try {
		const { id } = req.params;
		const data = await userModel.findByIdAndDelete(id);
		res.status(200).json({
			status: "ok",
			message: "successfully deleted",
			data: data,
		});
	} catch (err) {
		res.status(500).json({
			status: "error",
			message: "internal error",
			data: null,
		});
	}
}

module.exports = {
	registerUsers,
	updateUsers,
	deletesUsers,
	getUsers,
};
