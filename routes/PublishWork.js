const express = require("express");
const router = express.Router();

// Mongoose
const Work = require("../model/Work");
const mongoose = require("mongoose");

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
		const resultCover = await cloudinary.uploader.upload(coverToUpload);

		// slider
		const sliderToUpload = req.files;
		const tabKeyPictures = Object.keys(sliderToUpload);
		const tabResult = [];
		for (let i = 1; i < tabKeyPictures.length; i++) {
			const iPicture = req.files[tabKeyPictures[i]];
			const resultSlider = await cloudinary.uploader.upload(
				iPicture.path
			);
			tabResult.push(resultSlider);
		}
		console.log(tabResult);
		// checkbox
		const titre = req.fields;
		console.log("--->", titre);

		const newWork = new Work({
			cover: resultCover,
			content: {
				_id: new mongoose.Types.ObjectId(),
				slider: tabResult,
				skills: [1, 2, 3, 4],
				title: req.fields.valueTitle,
				description: req.fields.valueTextarea,
			},
		});
		await newWork.save();

		res.status(200).json("routes addworks ok");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
