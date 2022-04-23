const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 5000;

// middleware : req > do something > res
const logger = require("./logger");
const authorize = require("./authorize");


app.use("/api", [logger, authorize]);
app.use(morgan("tiny"));

app.get("/", (req, res) => {
	res.status(200).send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
	res.status(200).send("<h1>About Page</h1><a href='/'>Back to home</a>");
});

app.get("/api/user", (req, res) => {
	res.send("User Info")
	console.log(req.user);
})

//app listening :
app.listen(port, () => {
	console.log(`App is Running at ${port}`);
});
