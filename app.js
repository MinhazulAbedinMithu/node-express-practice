const express = require("express");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
	res.send("Hello World");
});

//app listening :
app.listen(port, () => {
	console.log(`App is Running at ${port}`);
});
