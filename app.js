const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
// const mongoose = require("mongoose");

const taskRoutes = require("./routes/task");
const connectDB = require("./db/connectDB");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// deployment
// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.get("*", function (request, response) {
// 	response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });

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

// mongoose.connect(process.env.MONGO_URI);

// mongoose.connection.on("error", (err) => {
// 	console.log("err", err);
// });
// mongoose.connection.on("connected", (err, res) => {
// 	console.log("mongoose is connected");
// });

// app.listen(process.env.PORT, () => {
// 	console.log(`App listening at PORT : ${process.env.PORT}`);
// });
