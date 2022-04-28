const express = require("express");
require("dotenv").config();

const taskRoutes = require("./routes/task");

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome in Task Manager");
});

//routes: Task Manager
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`);
});
