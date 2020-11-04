/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/user';

const NavBar = ({ isLoggedIn, handleClick }) => {
	console.log(isLoggedIn);
	return (
		<div>
			{isLoggedIn ? (
				<nav id="nav-container" className="text-link">
					<a href="#" onClick={handleClick}>
						Logout
					</a>
					<NavLink to="/createanewmap">New Map</NavLink>
					<NavLink to="/home">Home</NavLink>
				</nav>
			) : (
				<div>
					<nav id="nav-container" className="text-link">
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/signup">Sign Up</NavLink>
						<NavLink to="/createamap">Create a Map</NavLink>
					</nav>
				</div>
			)}
		</div>
	);
};

const mapState = (state) => {
	return {
		isLoggedIn: !!state.user.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(NavBar);

//eventually have the ternary for if youre logged in
