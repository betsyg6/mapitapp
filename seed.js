/** @format */

const { db, User, Mapp } = require('./server/db');

const seed = async () => {
	try {
		await db.sync({ force: true });

		// seed your database here!

		const admin = await User.create({
			email: 'admin',
			password: 'admin',
			isAdmin: true,
		});

		const betsy = await User.create({
			email: 'betsy@email.com',
			password: '123',
		});

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
