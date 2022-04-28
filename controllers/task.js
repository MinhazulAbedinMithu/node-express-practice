const getTasks = async (req, res) => {
	res.send("get all tasks");
};

const createTask = async (req, res) => {
	res.send(req.body);
};

const getSingleTask = async (req, res) => {
	res.send("get single tasks");
};

const editTask = async (req, res) => {
	res.send("edit task");
};

const deleteTask = async (req, res) => {
	res.send("delete task");
};

module.exports = { getTasks, createTask, getSingleTask, editTask, deleteTask };
