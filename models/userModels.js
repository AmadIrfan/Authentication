const mongoose = require("mongoose");

const user = new mongoose.Schema(
	{
		firstName: { type: String, default: null },
		lastName: { type: String, default: null },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isVerified: { type: Boolean, required: true, default: false },
		dateOfBirth: { type: Date, default: null },
		role: { type: String, enum: ["superAdmin", "admin", "user"], default: 'admin' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", user);
