require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

// Routes
const Contact = require("./routes/Contact");
app.use(Contact);

app.all("*", (req, res) => {
	try {
		res.status(200).json("app.all : route inconnue");
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.listen(3100, () => {
	console.log("server portfolio started");
});
