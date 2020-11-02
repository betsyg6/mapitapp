/** @format */

import axios from 'axios';

const GET_LOCATIONS = 'GET_LOCATIONS';
const ADD_LOCATION = 'ADD_LOCATION';
const REMOVE_LOCATION = 'REMOVE_LOCATION';

const getLocations = (locations) => ({ type: GET_LOCATIONS, locations });
const addLocation = (obj, mapId) => ({
	type: ADD_LOCATION,
	location: obj,
	mapId,
});
// const removeLocation = (locationId) => ({ type: REMOVE_LOCATION, locationId });

export const get = (mapId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/userMap/${mapId}`);
		//convert map coordinates back to numbers?
		dispatch(getLocations(res.data));
	} catch (err) {
		console.log(err);
	}
};

export const add = (obj, mapId) => async (dispatch) => {
	try {
		//will need to convert map coords to strings
		const res = await axios.post(`/api/userMap/${mapId}`, obj);
		dispatch(addLocation(res.data));
	} catch (err) {
		console.log(err);
	}
};

//havent written this yet...
// export const remove = (locationId) => async (dispatch) => {
// 	try {
// 		const res = await axios.delete(`/api/userMap/${mapId}`);
// 		dispatch(removeLocation());
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

const defaultLocations = [];
export default function locationsReducer(state = defaultLocations, action) {
	switch (action.type) {
		case GET_LOCATIONS:
			return action.locations;
		case ADD_LOCATION:
			return [...state, action.location];
		default:
			return state;
	}
}
