const mongoose = require("mongoose");

const Connect = mongoose.model("Connect", {
	email: { type: String, unique: true },
	hash: String,
	salt: String,
});

module.exports = Connect;
