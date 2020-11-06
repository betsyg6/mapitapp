/** @format */

const { db, User, Mapp, Location } = require('./server/db');

const seed = async () => {
	try {
		await db.sync({ force: true });

		const admin = await User.create({
			email: 'admin',
			password: 'admin',
			isAdmin: true,
		});

		const betsy = await User.create({
			email: 'betsy@email.com',
			password: '123',
		});

		const newYork = await Mapp.create({
			city: 'New York',
		});

		const locash = await Location.create({
			latitude: '40.725193570639945',
			longitude: '-73.95635596586763',
		});

		await betsy.addMapp(newYork);
		await newYork.addLocation(locash);

		console.log(Object.keys(betsy.__proto__));
	} catch (err) {
		console.log(err);
	}
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
	seed()
		.then(() => {
			console.log('Seeding success!');
		})
		.catch((err) => {
			console.error('Oh noes! Something went wrong!');
			console.error(err);
		});
}
