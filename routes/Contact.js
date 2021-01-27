const express = require("express");
const router = express.Router();

router.post("/contact", (req, res) => {
	console.log(req.fields);
	try {
		res.status(200).json("routes /contact ok");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
