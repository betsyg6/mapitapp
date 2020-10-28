const Sequelize = require('sequelize');
const db = require('./db');

const Location = db.define('location', {
	latitude: {
		type: Sequelize.TEXT,
	},
	longitude: {
		type: Sequelize.TEXT,
	},
	icon: {
		type: Sequelize.TEXT
	}
});

module.exports = Location;