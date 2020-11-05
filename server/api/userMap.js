/** @format */

const router = require('express').Router();
const { User, Mapp, Location } = require('../db');

// let user = req.user.id <<will need this for user middleware

//get one map and it's locations
router.get('/:id', async (req, res, next) => {
	try {
		console.log('req session', req.session.passport);
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
		await user.update(user.addMapp(map));
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

//delete a map and its locations
router.delete('/:id', async (req, res, next) => {
	try {
		await Mapp.destroy({
			where: {
				id: req.params.id,
			},
		});
		//this part isn't working right now
		let locations = await Location.findAll({
			where: {
				mappId: req.params.id,
			},
		});
		await locations.forEach((location) => {
			location.destroy();
		});
		// await Location.destroy({
		// 	where: {
		// 		mappId: req.params.id,
		// 	},
		// });
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

//delete one location
router.delete('/map/:id', async (req, res, next) => {
	try {
		await Location.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
});

//update a location
router.put('/map/:id', async (req, res, next) => {
	try {
		const location = await Location.findByPk(req.params.id);
		const updateLocation = await location.update(req.body);
		res.json(updateLocation);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
