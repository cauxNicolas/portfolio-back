const express = require("express");
const router = express.Router();
// Function
const isAuthenticated = require("../function/isAuthenticated");

router.post("/publish-work", isAuthenticated, (req, res) => {
	/* console.log("req.fields", req.fields);
		console.log("req.files", req.files); */
	try {
		//creator: req.publish
		res.status(200).json("routes addworks ok");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
