const express = require("express");
const router = express.Router();
const Work = require("../model/Work");

router.get("/work/:id", async (req, res) => {
	console.log(req.params);
	try {
		/* if (req.params.id) {
			const searchId = await Work.findById({ _id: req.params.id });
			res.status(200).json(searchId);
		} */
		res.status(200).json("ok work/:id");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
