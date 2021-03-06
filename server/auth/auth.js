/** @format */

const router = require('express').Router();
const { User, Mapp, Location } = require('../db');

//get user's info
router.get('/me', async (req, res, next) => {
	try {
		console.log(req.session);
		if (!req.session.passport.user) {
			res.sendStatus(401);
		} else {
			const user = await User.findByPk(req.session.passport.user, {
				include: [
					{
						model: Mapp,
					},
				],
			});
			if (!user) {
				res.sendStatus(401);
			} else {
				res.json(user);
			}
		}
	} catch (error) {
		next(error);
	}
});

//login
router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { email: req.body.email },
			include: [
				{
					model: Mapp,
				},
			],
		});
		if (!user) {
			console.log('No such user found:', req.body.email);
			res.status(401).send('Wrong username and/or password');
		} else if (!user.correctPassword(req.body.password)) {
			console.log('Incorrect password for user:', req.body.email);
			res.status(401).send('Wrong username and/or password');
		} else {
			req.login(user, (err) => (err ? next(err) : res.json(user)));
		}
	} catch (err) {
		next(err);
	}
});

//signup
router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create(req.body, {
			include: [
				{
					model: Mapp,
				},
			],
		});
		req.login(user, (err) => (err ? next(err) : res.json(user)));
	} catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('User already exists');
		} else {
			next(err);
		}
	}
});

//logout
router.delete('/logout', (req, res) => {
	// remove user id from session
	delete req.session.userId;
	res.sendStatus(204);
});

router.use('/google', require('./googleOauth'));

module.exports = router;
