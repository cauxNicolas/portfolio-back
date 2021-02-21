const express = require("express");
const router = express.Router();
const Work = require("../model/Work");

router.get("/work/:id", async (req, res) => {
	try {
		res.status(200).json("ok pour la route /:id");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
