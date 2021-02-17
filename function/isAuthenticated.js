// function isAuthenticated
const Connect = require("../model/Connect");

const isAuthenticated = async (req, res, next) => {
	if (req.headers.authorization) {
		const publish = await Connect.findOne({
			token: req.headers.authorization.replace(`Bearer `, ``),
		});

		if (!publish) {
			return res.status(401).json({ error: `non autorisé` });
		} else {
			return next();
		}
	} else {
		return res.status(401).json({ error: `non autorisé` });
	}
};

module.exports = isAuthenticated;
