const express = require("express");
require("dotenv").config();

const taskRoutes = require("./routes/task");
const connectDB = require("./db/connectDB");

const app = express();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome in Task Manager");
});

//routes: Task Manager
app.use("/api/task", taskRoutes);

const startServer = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => {
			console.log(`App is running at ${process.env.PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
};

startServer();
