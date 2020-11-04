/** @format */

const Sequelize = require('sequelize');
const db = require('./db');

const Mapp = db.define('mapp', {
	city: {
		type: Sequelize.STRING,
	},
});

module.exports = Mapp;
