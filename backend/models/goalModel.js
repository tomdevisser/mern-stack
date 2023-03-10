const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		description: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
