const authorize = (req, res, next) => {
	const { user } = req.query;
	if (user === "mithu") {
		req.user = { name: "mithu", id: 4 };
		next();
	} else {
		res.status(401).send("Unauthorize");
	}
};

module.exports = authorize;
