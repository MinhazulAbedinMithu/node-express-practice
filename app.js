const express = require("express");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
	res.status(200).send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
	res.status(200).send("<h1>Home Page</h1><a href='/'>Back to home</a>");
});

app.get("*", (req, res) => {
	res.status(404).send("Content not Found !!!");
});

//app listening :
app.listen(port, () => {
	console.log(`App is Running at ${port}`);
});
