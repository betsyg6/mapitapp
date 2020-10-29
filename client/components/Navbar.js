/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';

const NavBar = () => {
	return (
		<div>
			<Header />
			<nav id="nav-container" className="text-link">
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
				<NavLink to="/createamap">Create a Map</NavLink>
			</nav>
		</div>
	);
};

export default NavBar;

//eventually have the ternary for if youre logged in
