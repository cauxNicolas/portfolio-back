const express = require("express");
const router = express.Router();

router.post("/add-works", (req, res) => {
	try {
		res.status(200).json("routes addworks ok");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
