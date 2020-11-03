/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from '../store/map';

class Home extends Component {
	render() {
		console.log('user', this.props.user);
		return (
			<div>
				<h1>Hey, {this.props.user.email}!</h1>

				<h3>View Your Old Maps</h3>

				{this.props.user.maps ? (
					<ul>
						{this.props.user.maps.map((obj) => {
							return <li key={obj.id}>{obj.city}</li>;
						})}
					</ul>
				) : (
					<p>No Maps Yet!</p>
				)}
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
		getMap: (mapId) => dispatch(get(mapId)),
	};
};

export default connect(mapState, mapDispatch)(Home);
