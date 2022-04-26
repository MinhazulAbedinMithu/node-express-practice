const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
	const { name } = req.body;
	if (name !== "mithu") {
		return res.status(404).json({ success: false, msg: "Login Failed" });
	}
	return res.status(200).json({ success: true, msg: `Hello ${name}` });
});

module.exports = router;
