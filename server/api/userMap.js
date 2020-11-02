/** @format */

const router = require('express').Router();
const { User, Mapp, Location } = require('../db');

// let user = req.user.id <<will need this for user middleware

//get one map and it's locations
router.get('/:id', async (req, res, next) => {
	try {
		let map = await Mapp.findByPk(req.params.id, {
			include: [
				{
					model: Location,
					// where: {
					// 	mapId: req.params.id,
					// },
				},
			],
		});
		res.json(map);
	} catch (err) {
		next(err);
	}
});

//associate a map to a user
router.post('/map', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id);
		const map = await Mapp.create(req.body);
		await user.update(user.addMap(map));
		res.json(map);
	} catch (err) {
		next(err);
	}
});

//associate locations to one map
router.post('/:id', async (req, res, next) => {
	try {
		let map = await Mapp.findByPk(req.params.id);

		let newLocation = await Location.create(req.body);
		await map.update(map.addLocation(newLocation));
		res.json(newLocation);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
