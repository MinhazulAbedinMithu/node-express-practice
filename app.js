const express = require("express");

const app = express();
const port = 5000;

const { users } = require("./fakeData");

app.get("/", (req, res) => {
	res.status(200).send("<h1>Home Page</h1>");
});

app.get("/about", (req, res) => {
	res.status(200).send("<h1>Home Page</h1><a href='/'>Back to home</a>");
});

//read JSON to show users
app.get("/users", (req, res) => {
	const newUsers = users.map((user) => {
		const { id, name, email, phone, website } = user;
		return { id, name, email, phone, website };
	});
	res.status(200).json(newUsers);
});

//params to show single User
app.get("/users/:userID", (req, res) => {
	console.log(req.params.userID);
	const singleUser = users.find(
		(user) => user.id === Number(req.params.userID)
	);
	if (!singleUser) {
		res
			.status(404)
			.send("<h1>Content Not Found</h1><a href='/'>Back to home</a>");
	}
	res.status(200).send(singleUser);
});

//Query String: Search and set limit
app.get("/api/users/query", (req, res) => {
	const { search, limit } = req.query;
	let searchedUsers = [...users];
	if (search) {
		searchedUsers = searchedUsers.filter((user) => {
			return user.name.startsWith(search);
		});
	}

	if (limit) {
		searchedUsers = searchedUsers.slice(0, Number(limit));
	}

	if (searchedUsers.length < 1) {
		return res.status(200).json({
			success: true,
			data: [],
			message: "No user matched with your search key",
		});
	}

	res.send(searchedUsers);
});

app.get("*", (req, res) => {
	res
		.status(404)
		.send("<h1>Content Not Found</h1><a href='/'>Back to home</a>");
});

//app listening :
app.listen(port, () => {
	console.log(`App is Running at ${port}`);
});
