/** @format */

const router = require('express').Router();
const { User, Map, Location } = require('../db');

//get all maps for one user
router.get('/', async (req, res, next) => {
	try {
		let maps = await Map.findAll({
			where: {
				userId: req.user.id,
			},
			include: [{ model: Location }],
		});
		res.json(maps);
	} catch (err) {
		next(err);
	}
});

//associate a map to a user
router.post('/', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id);
		const map = await map.create(req.body);
		await user.update(user.addMap(map));
		res.json(map);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
