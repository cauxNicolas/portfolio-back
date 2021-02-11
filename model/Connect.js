const mongoose = require("mongoose");

const Connect = mongoose.model("Connect", {
	email: String,
	hash: String,
	salt: String,
	token: String,
});

module.exports = Connect;
