const express = require("express");

const peopleRoutes = require("./routes/people");
const authRoutes = require("./routes/auth");

const app = express();
const port = 5000;

//Middleware
app.use(express.static("./method-crud"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//HTTP Methods :::
app.use("/auth", authRoutes);
app.use("/api/people", peopleRoutes);


//app listening :
app.listen(port, () => {
	console.log(`App is Running at ${port}`);
});
