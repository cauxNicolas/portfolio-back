const mongoose = require("mongoose");

const Travaux = mongoose.model("Travaux", {
	picture: String,
	project: {
		works: [String],
		skills: [
			{
				title: String,
				skills_img: [String],
			},
		],
		project: {
			title: String,
			about: String,
		},
	},
});

module.exports = Travaux;
