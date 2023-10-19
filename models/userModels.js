const mongoose = require("mongoose");

const user = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isVerified: { type: Boolean, required: true, default: false },
		dateOfBirth: { type: Date, required: true },
		role: { type: String, enum: ["superAdmin", "admin", "moderator"] },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", user);
