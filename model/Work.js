const mongoose = require("mongoose");

const Work = mongoose.model("Work", {
	cover: String,
	content: {
		slider: [String],
		skills: [String],
		title: String,
		description: String,
	},
});

module.exports = Work;
