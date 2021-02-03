const express = require("express");
const router = express.Router();
const Client = require("../model/Client");

router.post("/contact", async (req, res) => {
	const validateEmail = (value) => {
		const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		return re.test(String(value).toLowerCase());
	};

	if (
		req.fields.name !== "" &&
		req.fields.lastname !== "" &&
		req.fields.email !== "" &&
		req.fields.textarea !== ""
	) {
		try {
			const name = req.fields.name;
			const lastname = req.fields.lastname;
			const email = req.fields.email;
			const textarea = req.fields.textarea;

			const testEmail = validateEmail(email);
			if (testEmail === true) {
				const newClient = new Client({
					name,
					lastname,
					email,
					textarea,
				});
				// await newClient.save();
				res.status(200).json(
					"Merci ! Votre message est bien enregistré"
				);
			} else {
				res.status(400).json({
					message: "Merci de remplir les champs correctement",
				});
			}
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	} else {
		res.status(400).json("merci de remplir les champs");
	}
});

module.exports = router;
