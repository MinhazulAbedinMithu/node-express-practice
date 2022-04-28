const express = require("express");
const {
	getTasks,
	createTask,
	getSingleTask,
	editTask,
	deleteTask,
} = require("../controllers/task");

const router = express.Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getSingleTask).patch(editTask).delete(deleteTask);

module.exports = router;
