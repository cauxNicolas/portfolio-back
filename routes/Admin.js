const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const Connect = require("../model/Connect");

router.post("/react-admin-connect", async (req, res) => {
	if (req.fields.passOne !== "" && req.fields.passTwo !== "") {
		const validatePassOne = (value) => {
			const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
			return re.test(String(value).toLowerCase());
		};
		const validatePassTwo = (value) => {
			const re = /^[a-z0-9_-]{3,30}$/;
			return re.test(String(value).toLowerCase());
		};

		const passOne = req.fields.passOne;
		const passTwo = req.fields.passTwo;

		const testPassOne = validatePassOne(passOne);
		const testPassTwo = validatePassTwo(passTwo);

		if (testPassOne === true && testPassTwo === true) {
			const search = await Connect.findOne({ email: passOne });
			if (search) {
				const newHash = SHA256(passTwo + search.salt).toString(
					encBase64
				);
				if (newHash === search.hash) {
					try {
						res.status(200).json({ token: search.token });
					} catch (error) {
						res.status(400).json({ message: error.message });
					}
				}
			}
		} else {
			res.status(400).json({ message: "invalid" });
		}
	} else {
		res.status(400).json({ message: "remplir les champs" });
	}
});

module.exports = router;
