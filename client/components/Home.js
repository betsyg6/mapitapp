/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from '../store/map';
import { Link } from 'react-router-dom';
import { fetchMaps, deleteMap } from '../store/maps';
import { me } from '../store/user';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchMaps();
		this.props.me();
	}

	render() {
		console.log('maps', this.props.maps);
		return (
			<div>
				<h1>Hey, {this.props.user.email}!</h1>

				<h3>View Your Old Maps</h3>

				{this.props.maps.length > 0 ? (
					<ul>
						{this.props.maps.map((obj) => {
							//make these into links that you can click and it takes you to the map
							return (
								<div key={obj.id}>
									<Link to={`/singlemap/${obj.id}`}>
										<p>{obj.city}</p>
									</Link>
									<button
										type="button"
										onClick={() => this.props.deleteMap(obj.id)}
									>
										x
									</button>
								</div>
							);
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
		maps: state.maps,
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchMaps: () => dispatch(fetchMaps()),
		deleteMap: (id) => dispatch(deleteMap(id)),
		me: () => dispatch(me()),
	};
};

export default connect(mapState, mapDispatch)(Home);
