/** @format */

const Sequelize = require('sequelize');
const db = require('./db');

const Mapp = db.define('map', {
	city: {
		type: Sequelize.STRING,
	},
});

module.exports = Mapp;
