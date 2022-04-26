let { people } = require("../fakeData");

const getPeople = (req, res) => {
	res.status(200).json({ success: true, data: people });
};

const createPeople = (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res
			.status(401)
			.json({ success: false, msg: "Please Provide name value" });
	}
	res.status(201).json({ success: true, person: name });
};

const updatePeople = (req, res) => {
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
};

const deletePeople = (req, res) => {
	const person = people.find((p) => p.id === Number(req.params.id));
	if (!person) {
		return res
			.status(404)
			.json({ success: false, msg: `Couldn't found id: ${req.params.id}` });
	}
	const newPeople = people.filter((p) => p.id !== person.id);
	res.status(200).json({ success: true, people: newPeople });
};

module.exports = {
	getPeople,
	createPeople,
	updatePeople,
	deletePeople,
};
