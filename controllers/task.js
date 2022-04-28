const mongoose = require("mongoose");
const taskSchema = require("../models/Task");

const getTasks = async (req, res) => {
	try {
		const tasks = await taskSchema.find({});
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(501).json({ msg: error });
	}
};

const createTask = async (req, res) => {
	try {
		const newTask = await taskSchema.create(req.body);
		res.status(200).json({ newTask });
	} catch (error) {
		res.status(501).json({ msg: error });
	}
};

const getSingleTask = async (req, res) => {
	try {
		const { id: taskId } = req.params;
		const task = await taskSchema.findOne({ _id: taskId });
		if (!task) {
			res.status(401).json({ msg: `task not found with ID : ${taskId}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(501).json({ msg: error });
	}
};

const editTask = async (req, res) => {
	try {
		const { id: taskId } = req.params;
		const task = await taskSchema.findOneAndUpdate({ _id: taskId }, req.body, {
			new: true,
			runValidators: true,
		});

		if (!task) {
			res.status(401).json({ msg: `Task not found with ID : ${taskId}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(501).json({ msg: error });
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id: taskId } = req.params;
		const task = await taskSchema.findOneAndDelete({ _id: taskId });
		if (!task) {
			res.status(401).json({ msg: `task not found with ID : ${taskId}` });
		}
		res.status(200).json({ msg: "task successfully deleted" });
	} catch (error) {
		res.status(501).json({ msg: error });
	}
};

module.exports = { getTasks, createTask, getSingleTask, editTask, deleteTask };
