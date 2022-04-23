const express = require("express");

const app = express();
const port = 5000;

// middleware : req > do something > res
const logger = (req, res, next) => {
	const method = req.method;
	const url = req.url;
	const year = new Date().getFullYear();

	console.log(method, url, year);
	next()
}

app.get("/", logger, (req, res) => {
	res.status(200).send("<h1>Home Page</h1>");
});

app.get("/about",logger, (req, res) => {
	res.status(200).send("<h1>Home Page</h1><a href='/'>Back to home</a>");
});


//app listening :
app.listen(port, () => {
	console.log(`App is Running at ${port}`);
});
