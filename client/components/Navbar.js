/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<div>
			<NavLink to="/createamap">Create a Map</NavLink>
			<NavLink to="/login">Login</NavLink>
		</div>
	);
};

export default NavBar;

//eventually have the ternary for if youre logged in
