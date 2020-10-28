/** @format */

const Sequelize = require('sequelize');
const db = require('./db');

const Map = db.define('map', {
	city: {
		type: Sequelize.STRING,
	},
});

module.exports = Map;
