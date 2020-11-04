/** @format */

import React from 'react';
import { Map, Marker, Popup, TileLayer, withLeaflet } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import nextId from 'react-id-generator';
import PrintControlDefault from 'react-leaflet-easyprint';
const PrintControl = withLeaflet(PrintControlDefault);
import { connect } from 'react-redux';
import { get, add, remove } from '../store/map';
import { me } from '../store/user';

class SingleMap extends React.Component {
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
		this.handleSave = this.handleSave.bind(this);
	}

	componentDidMount() {
		const num = Number(this.props.match.params.id);
		this.props.getMap(num);

		// this.setState({
		// 	lat: this.props.map.locations[0].latitude,
		// 	lng: this.props.map.locations[0].longitude,
		// });
	}

	handleSave() {
		this.state.description.forEach((obj) => {
			if (!obj.saved) {
				this.props.addLocation(
					{
						latitude: obj.latitude.toString(),
						longitude: obj.longitude.toString(),
						title: obj.title,
						imageUrl: obj.imageUrl,
						icon: obj.icon,
					},
					this.props.map.id
				);
				obj.saved = true;
			}
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
		obj.latitude = latt;
		obj.longitude = long;
		obj.position = [latt, long];
		obj.id = nextId();

		let description = this.state.description;
		description.push(obj);
		this.setState({ ...description, lat: coords.lat, lng: coords.lng });
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let obj = this.state.description.filter((obj) => {
			return (
				obj.latitude === this.state.lat && obj.longitude === this.state.lng
			);
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
		console.log('locations', this.props.map.locations);

		return (
			<div>
				<div>
					<h2>{this.props.map.city}</h2>

					<div id="buttonContainer">
						<button id="findMe" onClick={this.findMe}>
							Find me!
						</button>
					</div>

					<Map
						center={[this.state.lat, this.state.lng]}
						zoom={13}
						onClick={this.handleClick}
					>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>

						{this.props.map.locations &&
							this.props.map.locations.length > 0 &&
							this.props.map.locations.map((obj) => (
								<Marker
									key={`marker-${obj.id}`}
									position={[obj.latitude, obj.longitude]}
									icon={obj.icon === 'Favorite Bars' ? bar : heart}
								>
									<Popup>
										<div>
											<p>{obj.title}</p>
											<img src={obj.imageUrl} alt="" />

											<button
												type="button"
												onClick={() => {
													this.props.remove(obj.id);
												}}
											>
												Delete
											</button>
										</div>
									</Popup>
								</Marker>
							))}

						{this.state.description.length > 0 &&
							this.state.description.map((obj) => (
								<Marker
									key={`marker-${obj.id}`}
									position={obj.position}
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
													required
												/>
												<input
													name="imageUrl"
													type="text"
													placeholder="imageUrl"
													onChange={this.handleChange}
													required
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

					<button type="button" onClick={this.handleSave}>
						Save
					</button>
				</div>
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
		me: () => dispatch(me()),
		remove: (id) => dispatch(remove(id)),
	};
};

export default connect(mapState, mapDispatch)(SingleMap);
