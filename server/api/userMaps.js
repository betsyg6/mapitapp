/** @format */

const router = require('express').Router();
const { User, Mapp, Location } = require('../db');

//get all maps for one user
router.get('/', async (req, res, next) => {
	try {
		let maps = await Mapp.findAll({
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
		const map = await Mapp.create(req.body);
		await user.update(user.addMapp(map));
		res.json(map);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
