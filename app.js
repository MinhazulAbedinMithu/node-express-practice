const express = require("express");

let { people } = require("./fakeData");

const app = express();
const port = 5000;

//Middleware
app.use(express.static("./method-crud"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//HTTP Methods :::

app.get("/api/people", (req, res) => {
	res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res
			.status(401)
			.json({ success: false, msg: "Please Provide name value" });
	}
	res.status(201).json({ success: true, person: name });
});

app.put("/api/people/:id", (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const person = people.find((p) => p.id === Number(id));
	if (!person) {
		return res
			.status(401)
			.json({ success: false, msg: `Couldn't found id: ${id}` });
	}

	const newPeople = people.map((p) => {
		if (p.id === Number(id)) {
			p.name = name;
		}
		return p;
	});

	res.status(201).json({ success: true, people: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
	const person = people.find((p) => p.id === Number(req.params.id));
	if (!person) {
		return res
			.status(404)
			.json({ success: false, msg: `Couldn't found id: ${req.params.id}` });
	}
	const newPeople = people.filter((p) => p.id !== person.id);
	res.status(200).json({ success: true, people: newPeople });
});

//app listening :
app.listen(port, () => {
	console.log(`App is Running at ${port}`);
});
