/** @format */

const db = require('./db');
const User = require('./user');
const Mapp = require('./map');
const Location = require('./location');

//associations
Mapp.belongsTo(User);
User.hasMany(Mapp);

Location.belongsTo(Mapp);
Mapp.hasMany(Location);

module.exports = {
	db,
	User,
	Mapp,
};
