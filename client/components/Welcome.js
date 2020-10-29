/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';

const Welcome = () => {
	return (
		<div>
			<h1 className="welcome">Welcome to Map It!</h1>
			<div id="mininav">
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
				<NavLink to="/createamap">Create a Map!</NavLink>
			</div>
		</div>
	);
};

export default Welcome;
