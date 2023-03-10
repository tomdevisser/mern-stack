const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	loginUser,
	getUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
