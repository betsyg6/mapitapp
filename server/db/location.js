/** @format */

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
		type: Sequelize.STRING,
	},
	title: {
		type: Sequelize.STRING,
	},
	imageUrl: {
		type: Sequelize.TEXT,
	},
});

module.exports = Location;
