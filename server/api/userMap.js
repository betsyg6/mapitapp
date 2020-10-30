/** @format */

const router = require('express').Router();
const { User, Map, Location } = require('../db');

// let user = req.user.id <<will need this for user middleware

//get one map and it's locations
router.get('/:id', async (req, res, next) => {
	try {
		let map = await Map.findByPk(req.params.id, {
			include: [
				{
					model: Location,
					where: {
						mapId: req.params.id,
					},
				},
			],
		});
		res.json(map);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
