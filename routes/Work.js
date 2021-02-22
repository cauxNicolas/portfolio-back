const express = require("express");
const router = express.Router();
const Work = require("../model/Work");

router.get("/work/:id", async (req, res) => {
	try {
		if (req.params.id) {
			const searchId = await Work.findById({ _id: req.params.id });
			res.status(200).json(searchId);
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
