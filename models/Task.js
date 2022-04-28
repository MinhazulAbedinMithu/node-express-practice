const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: String,
	complete: Boolean,
});

module.exports = mongoose.model("task", taskSchema);
