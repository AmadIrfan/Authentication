const express = require("express");
const { loginUser } = require("../controller/loginController");
const { SecureAPI } = require("../utils/middleWare");
const router = express.Router();

function requireRoles(roles) {
	return (req, res, next) => {
		const userRole = req.user.role; // Assuming you saved the user's role in req.user
		if (roles.includes(userRole)) {
			// User has one of the required roles, so allow access
			next();
		} else {
			// User does not have any of the required roles, so send a forbidden response
			res.status(403).json({ message: "Permission denied" });
		}
	};
}

router.post("/userAuth", loginUser);
router.post("/admin", SecureAPI, requireRoles(["a", "u"]), (req, res) => {
	console.log(req.user);
	res.status(200).json("here admin click");
});

module.exports = router;
