/** @format */

const db = require('./db');
const User = require('./user');
const Map = require('./map');
const Location = require('./location');

//associations
Map.belongsTo(User);
User.hasMany(Map);

Location.belongsTo(Map);
Map.hasMany(Location);

module.exports = {
	db,
	User,
	Map,
};
