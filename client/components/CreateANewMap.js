/** @format */

import React from 'react';
import { Map, Marker, Popup, TileLayer, withLeaflet } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import nextId from 'react-id-generator';
import PrintControlDefault from 'react-leaflet-easyprint';
const PrintControl = withLeaflet(PrintControlDefault);
import { connect } from 'react-redux';
import { get, add, addAMap } from '../store/map';
import { me } from '../store/user';

// export const food = new L.Icon({
// 	iconUrl: './restaurant-outline.svg',
// 	iconSize: [25, 55],
// });

// export const heart = divIcon({
// 	html: renderToStaticMarkup(<i id="heart" className="fa fa-heart fa-2x" />),
// });
// export const bar = divIcon({
// 	html: renderToStaticMarkup(
// 		<i id="bar" className="fa fa-glass-martini fa-2x" />
// 	),
// });

class CreateANewMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 40.72683,
			lng: -73.943512,
			description: [],
			title: '',
			imageUrl: '',
			location: [],
			showMenu: false,
			icon: 'heart',
			mapAdded: false,
			city: '',
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.findMe = this.findMe.bind(this);
		this.addMap = this.addMap.bind(this);
		// this.menuToggle = this.menuToggle.bind(this);
	}

	// menuToggle() {
	// 	this.setState({ showMenu: !this.state.showMenu });
	// }


	addMap() {
		let obj = { city: this.state.city };
		this.props.addAMap(obj);
		//add conditional for if the thunk was successful
		this.setState({
			mapAdded: true,
		});
	}

	findMe() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
	}

	handleClick(event) {
		let coords = event.latlng;
		let obj = {};
		let latt = coords.lat;
		let long = coords.lng;
		obj.latitude = latt.toString();
		obj.longitude = long.toString();

		this.props.addLocation(obj, this.props.map.id);
		this.props.getMap(this.props.map.id);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let obj = this.state.description.filter((obj) => {
			return obj.lat === this.state.lat && obj.lng === this.state.lng;
		});
		let icon = this.state.icon;
		let titleText = this.state.title;
		let image = this.state.imageUrl;
		obj[0].title = titleText;
		obj[0].imageUrl = image;
		obj[0].icon = icon;
		let description = this.state.description;
		this.setState({ description });
	}

	render() {
		// 	// <i id="home" className="fa fa-home fa-2x" />

		const heart = divIcon({
			html: renderToStaticMarkup(
				<i id="heart" className="fa fa-heart fa-2x" />
			),
		});
		const bar = divIcon({
			html: renderToStaticMarkup(
				<i id="bar" className="fa fa-glass-martini fa-2x" />
			),
		});

		console.log('map', this.props.map);
		console.log('user', this.props.user);

		return (
			<div>
				{this.state.mapAdded ? (
					<div>
						<p>Click on the map to add a marker!</p>

						<div id="buttonContainer">
							<button id="findMe" onClick={this.findMe}>
								Find me!
							</button>
						</div>

						{/* <div className={this.state.showMenu ? 'showMenu' : 'hideMenu'}>
					<p>icon options!</p>
				</div>
				<button type="button" onClick={this.menuToggle}>*</button> */}

						<Map
							center={[this.state.lat, this.state.lng]}
							zoom={13}
							onClick={this.handleClick}
						>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							/>

							{this.props.locations &&
								this.props.locations.length > 0 &&
								this.props.locations.map((obj) => (
									<Marker
										key={`marker-${obj.id}`}
										position={[Number(obj.latitude), Number(obj.longitude)]}
										icon={obj.icon === 'Favorite Bars' ? bar : heart}
									>
										<Popup>
											{obj.title ? (
												<div>
													<p>{obj.title}</p>
													<img src={obj.imageUrl} alt="" />
												</div>
											) : (
												<form onSubmit={this.handleSubmit}>
													<input
														name="title"
														type="text"
														placeholder="title"
														onChange={this.handleChange}
													/>
													<input
														name="imageUrl"
														type="text"
														placeholder="imageUrl"
														onChange={this.handleChange}
													/>
													<select
														name="icon"
														value={this.state.icon}
														onChange={this.handleChange}
													>
														<option>Places I Love</option>
														<option>Favorite Bars</option>
													</select>
													<button type="submit">Submit</button>
												</form>
											)}

											<button
												type="button"
												onClick={() => {
													const filtered = this.state.description.filter(
														(object) => {
															return object.id !== obj.id;
														}
													);
													this.setState({ description: filtered });
												}}
											>
												Delete
											</button>
										</Popup>
									</Marker>
								))}

							<PrintControl
								position="topleft"
								sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
								hideControlContainer={false}
								title="Export as PNG"
								exportOnly
							/>
						</Map>
					</div>
				) : (
					<div>
						<p>Add a Map!</p>

						<form>
							<input
								name="city"
								type="text"
								placeholder="City"
								onChange={this.handleChange}
							/>
							<button type="button" onClick={this.addMap}>
								Add
							</button>
						</form>
					</div>
				)}
			</div>
		);
	}
}

const mapState = (state) => {
	return {
		user: state.user,
		map: state.map,
	};
};

const mapDispatch = (dispatch) => {
	return {
		getMap: (mapId) => dispatch(get(mapId)),
		addLocation: (obj, mapId) => dispatch(add(obj, mapId)),
		addAMap: (obj) => dispatch(addAMap(obj)),
		me: () => dispatch(me()),
	};
};

export default connect(mapState, mapDispatch)(CreateANewMap);

//view all popups?
//icons
