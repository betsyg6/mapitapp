/** @format */

const router = require('express').Router();
const { User, Mapp } = require('../db');

//get all users
router.get('/', async (req, res, next) => {
	try {
		let users = await User.findAll();
		res.json(users);
	} catch (err) {
		next(err);
	}
});


module.exports = router;
