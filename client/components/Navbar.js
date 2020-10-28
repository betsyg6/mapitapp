/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav id="navbar" className="text-link">
			<NavLink to="/createamap">Create a Map</NavLink>
			<NavLink to="/login">Login</NavLink>
		</nav>
	);
};

export default NavBar;

//eventually have the ternary for if youre logged in
