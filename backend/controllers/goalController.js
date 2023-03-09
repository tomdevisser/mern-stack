const asyncHandler = require("express-async-handler");

/**
 * @description Get all goals
 * @route GET /api/goals
 * @access Public
 */
const getGoals = asyncHandler(async (req, res) => {
	res.json({ message: "Get goals" });
});

/**
 * @description Create a goal
 * @route POST /api/goals
 * @access Public
 */
const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.title) {
		res.status(400);
		throw new Error("Title is required");
	}
	res.status(200).json({ message: "Create goal" });
});

/**
 * @description Update a goal
 * @route PUT /api/goals/:id
 * @access Public
 */
const updateGoal = asyncHandler(async (req, res) => {
	res.json({ message: `Update goal ${req.params.id}` });
});

/**
 * @description Delete a goal
 * @route DELETE /api/goals/:id
 * @access Public
 */
const deleteGoal = asyncHandler(async (req, res) => {
	res.json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
