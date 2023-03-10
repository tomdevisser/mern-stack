const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

/**
 * @description Get all users
 * @route GET /api/users
 * @access Public
 */
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

/**
 * @description Create a user
 * @route POST /api/users
 * @access Public
 */
const createUser = asyncHandler(async (req, res) => {
	if (!req.body.name || !req.body.email || !req.body.password) {
		res.status(400);
		throw new Error("Name, email, and password are required");
	}

	const userExists = await User.findOne({ email: req.body.email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

/**
 * @description Update a user
 * @route PUT /api/users/:id
 * @access Public
 */
const updateUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const user = await User.findById(req.params.id);

	if (user) {
		user.name = name;
		user.email = email;
		user.password = password;

		const updatedUser = await user.save();
		res.json(updatedUser);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

/**
 * @description Delete a user
 * @route DELETE /api/users/:id
 * @access Public
 */
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: "User removed" });
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

/**
 * @description Login a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

/**
 * @description Get a user
 * @route GET /api/users/me
 * @access Public
 */
const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

module.exports = {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	loginUser,
	getUser,
};
