const express = require("express");
const router = express.Router();

// Function
const isAuthenticated = require("../function/isAuthenticated");

// Cloudinary
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

router.post("/publish-work", isAuthenticated, async (req, res) => {
	try {
		// cover
		const coverToUpload = req.files.valueCover.path;
		const result = await cloudinary.uploader.upload(coverToUpload);
		console.log(result);
		// slider

		// titre description
		const objCheck = req.fields;

		// checkbox
		const tabObjCheck = Object.values(objCheck);
		// console.log(tabObjCheck);

		res.status(200).json("routes addworks ok");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
