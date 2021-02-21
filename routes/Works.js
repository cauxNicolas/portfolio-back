const express = require("express");
const router = express.Router();
const work = require("../model/Work");

router.get("/", async (req, res) => {
	try {
		const data = await work.find();
		res.status(200).json("ok tu recup la page works");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
