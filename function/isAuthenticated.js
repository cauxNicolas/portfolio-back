// function isAuthenticated
const Connect = require("../model/Connect");

const isAuthenticated = async (req, res, next) => {
	console.log(req.headers);
	if (req.headers.authorization) {
		const publish = await Connect.findOne({
			token: req.headers.authorization.replace(`Bearer `, ``),
		});
		console.log("publish--->", publish);

		if (!publish) {
			return res.status(401).json({ error: `non autorisé` });
		} else {
			// créer une clé "user" dans req. La route pourra avoir accès à req.user
			req.publish = publish;
			return next();
		}
	} else {
		return res.status(401).json({ error: `non autorisé` });
	}
};

module.exports = isAuthenticated;
