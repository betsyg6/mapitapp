/** @format */

const router = require('express').Router();
const { User, Map } = require('../db');

//get all maps for one user
router.get('/', async (req, res, next) => {
	try {
		let maps = await Map.findAll({
			where: {
				userId: req.user.id,
			},
		});
		res.json(maps);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
