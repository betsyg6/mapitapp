/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/user';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isLoggedIn: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.login(this.state.email, this.state.password);
		this.setState({
			email: '',
			password: '',
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="email">
						<small>Email</small>
					</label>
					<input
						name="email"
						type="text"
						placeholder="your email here..."
						onChange={this.handleChange}
						value={this.state.email}
						required
					/>
					<br />
					<label htmlFor="password">
						<small>Password</small>
					</label>
					<input
						name="password"
						type="password"
						placeholder="your password here..."
						onChange={this.handleChange}
						value={this.state.password}
						required
					/>
					<br />
					<button type="submit">Login</button>
				</form>
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatch = (dispatch) => {
	return {
		login: (email, password) => dispatch(login(email, password)),
	};
};

export default connect(mapState, mapDispatch)(Login);
