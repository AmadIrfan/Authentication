const express = require("express");
const {
	registerUsers,
	updateUsers,
	deletesUsers,
	getUsers,
} = require("../controller/userController");
const { verifyToken, checkRoles } = require("../utils/middleWare");

const router = express.Router();

router.get("/users", verifyToken, checkRoles(['admin']), getUsers);
router.post("/users", registerUsers);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deletesUsers);

module.exports = router;
