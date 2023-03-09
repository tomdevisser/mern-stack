const express = require("express");
const router = express.Router();
const {
	getGoals,
	deleteGoal,
	updateGoal,
	createGoal,
} = require("../controllers/goalController");

router.get("/", getGoals);

router.post("/", createGoal);

router.put("/:id", updateGoal);

router.delete("/:id", deleteGoal);

module.exports = router;
