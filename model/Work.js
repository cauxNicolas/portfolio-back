const mongoose = require("mongoose");

const Work = mongoose.model("Work", {
	created: Date,
	cover: Object,
	content: {
		_id: mongoose.Types.ObjectId,
		slider: [Object],
		skills: [String],
		title: String,
		description: String,
	},
});

module.exports = Work;
