const mongoose = require("mongoose");

const Client = mongoose.model("Client", {
	name: String,
	lastname: String,
	email: { type: String, unique: true },
	textarea: [String],
});

module.exports = Client;
