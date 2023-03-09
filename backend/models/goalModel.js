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
	},
	{
		timestamps: true,
	}
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
