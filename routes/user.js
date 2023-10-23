const express = require("express");
const {
	registerUsers,
	updateUsers,
	deletesUsers,
	getUsers,
} = require("../controller/userController");

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", registerUsers);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deletesUsers);
// router.post("/users/token", SecureAPI);

module.exports = router;
