const express = require("express");
const {
	getPeople,
	createPeople,
	updatePeople,
	deletePeople,
} = require("../controllers/people");

const router = express.Router();

// router.get("/", getPeople);
// router.post("/", createPeople);
// router.put("/:id", updatePeople);
// router.delete("/:id", deletePeople);

//or we can write this form in below:::
router.route("/").get(getPeople).post(createPeople);
router.route("/:id").put(updatePeople).delete(deletePeople);

module.exports = router;
