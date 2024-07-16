// @ts-nocheck
const express = require("express");
const { loginUser } = require("../controller/loginController");
const { verifyToken, checkRoles } = require("../utils/middleWare");
const router = express.Router();


router.post("/userLogin", loginUser);
router.post("/admin", verifyToken, checkRoles(['admin']), (req, res) => {
	res.status(200).json("admin dashboard");
});

module.exports = router;
