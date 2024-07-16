// @ts-nocheck
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function verifyToken(req, res, next) {
	var token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({ message: "No token provided" });
	}
	token = token.split(" ")[1]; //splitting the Bearer token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Failed to authenticate token" });
		}
		req.user = decoded;
		next();
	});

}

function checkRoles(roles) {
	return (req, res, next) => {
		const userRole = req.user.role;
		if (roles.includes(userRole)) {
			next();
		} else {
			res.status(403).json({ message: "Permission denied" });
		}
	};
}


module.exports = {
	verifyToken,
	checkRoles
};
