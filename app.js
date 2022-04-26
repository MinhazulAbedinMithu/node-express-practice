const express = require("express");

let { people } = require("./fakeData");

const app = express();
const port = 5000;

//Middleware
app.use(express.static("./method-crud"));
app.use(express.urlencoded({ extended: false }));

app.get("/api/people", (req, res) => {
	res.status(200).json({ success: true, data: people });
});

app.post("/login", (req, res) => {
	const name = req.body.name;
	const userName = "mithu"; //come from database;
	if (name === userName) {
		return res.send("Login Successful");
	}

	res.send("<h2>Unauthenticated</h2><a href='/'>Back to Home</a>");
});

//app listening :
app.listen(port, () => {
	console.log(`App is Running at ${port}`);
});
