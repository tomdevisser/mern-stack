const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

/**
 * @description Get all goals
 * @route GET /api/goals
 * @access Public
 */
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user._id });
	res.json(goals);
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

	const goal = new Goal({
		title: req.body.title,
		description: req.body.description,
		user: req.user._id,
	});

	const createdGoal = await goal.save();
	res.status(201).json(createdGoal);
});

/**
 * @description Update a goal
 * @route PUT /api/goals/:id
 * @access Public
 */
const updateGoal = asyncHandler(async (req, res) => {
	const { title, description } = req.body;

	const goal = await Goal.findById(req.params.id);
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error("Not authorized");
	}

	if (goal) {
		goal.title = title;
		goal.description = description;

		const updatedGoal = await goal.save();
		res.json(updatedGoal);
	} else {
		res.status(404);
		throw new Error("Goal not found");
	}
});

/**
 * @description Delete a goal
 * @route DELETE /api/goals/:id
 * @access Public
 */
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error("Not authorized");
	}

	if (!goal) {
		res.status(404);
		throw new Error("Goal not found");
	}

	await goal.deleteOne();
	res.json({ message: "Goal removed" });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
