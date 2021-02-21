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
	api_key: process.env.API_KEY_CLOUD,
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
		// checkbox
		const checkbox = req.fields;
		const newCheckBox = Object.values(checkbox);
		const tabSkills = [];
		for (let i = 2; i < newCheckBox.length; i++) {
			tabSkills.push(newCheckBox[i]);
		}
		const newWork = new Work({
			cover: resultCover,
			content: {
				_id: new mongoose.Types.ObjectId(),
				created: new Date(),
				slider: tabResult,
				skills: tabSkills,
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
