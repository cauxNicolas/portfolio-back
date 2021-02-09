const express = require("express");
const router = express.Router();
const Client = require("../model/Client");
// Mail
const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

router.post("/contact", async (req, res) => {
	// regExp
	const validateEmail = (value) => {
		const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		return re.test(String(value).toLowerCase());
	};

	const validateInput = (value) => {
		const re = /^[a-z0-9_-]{3,30}$/;
		return re.test(String(value).toLowerCase());
	};

	if (
		req.fields.name !== "" &&
		req.fields.lastname !== "" &&
		req.fields.email !== "" &&
		req.fields.textarea !== ""
	) {
		const name = req.fields.name;
		const lastname = req.fields.lastname;
		const email = req.fields.email;
		const textarea = req.fields.textarea;

		const testEmail = validateEmail(email);
		const testName = validateInput(name);
		const testLastname = validateInput(lastname);

		if (testEmail === true && testName === true && testLastname === true) {
			const mail = {
				from: `${name} ${lastname} <${email}>`,
				to: "nicaux95@gmail.com",
				subject: "nicaux.com - message",
				text: `${textarea}`,
			};

			await mailgun.messages().send(mail, (error, body) => {
				if (!error) {
					console.log("ok mail envoyé");
				}
				return res.status(401).json(error);
			});

			const search = await Client.findOne({ email: email });
			// si client envoie un 2e message
			if (search) {
				search.textarea.push(textarea);
				await search.save();
				await res
					.status(200)
					.json("Votre message à bien été rajouté !");
			} else {
				try {
					const newClient = new Client({
						name,
						lastname,
						email,
						textarea,
					});
					await newClient.save();
					await res
						.status(200)
						.json("Merci ! Votre message est bien enregistré");
				} catch (error) {
					res.status(400).json({ message: error.message });
				}
			}
		} else {
			res.status(400).json({
				message: "Merci de remplir les champs correctement",
			});
		}
	} else {
		res.status(400).json("merci de remplir les champs");
	}
});

module.exports = router;
