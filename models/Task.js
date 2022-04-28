const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Must be provide Task Name"],
		trim: true,
		maxlength: [25, "Task Name less than 25 characters"],
	},
	completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("task", taskSchema);
