const express = require("express");
const { loginUser } = require("../controller/loginController");

const router = express.Router();

router.post("/userAuth", loginUser);

module.exports = router;
