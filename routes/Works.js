const express = require("express");
const router = express.Router();
const Work = require("../model/Work");

router.get("/", async (req, res) => {
	try {
		const data = await Work.find().sort();
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
