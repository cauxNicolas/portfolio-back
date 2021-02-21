require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");

// connexion bdd
mongoose.connect(process.env.MONGODB_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const app = express();
app.use(formidable());
app.use(cors());
app.use(helmet());

// Routes
const Contact = require("./routes/Contact");
app.use(Contact);
const Works = require("./routes/Works");
app.use(Works);
const PublishWork = require("./routes/PublishWork");
app.use(PublishWork);
const Admin = require("./routes/Admin");
app.use(Admin);
const Work = require("./routes/Work");
app.use(Work);

app.all("*", (req, res) => {
	try {
		res.status(200).json({ message: "Portfolio started !" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.listen(process.env.PORT || 3100, () => {
	console.log("server portfolio started");
});
