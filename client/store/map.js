/** @format */

import axios from 'axios';

const GET_MAP = 'GET_MAP';
const ADD_LOCATION = 'ADD_LOCATION';
const REMOVE_LOCATION = 'REMOVE_LOCATION';
const ADD_MAP = 'ADD_MAP';

const getMap = (map) => ({ type: GET_MAP, map });
const addLocation = (obj, mapId) => ({
	type: ADD_LOCATION,
	location: obj,
	mapId,
});
const addMap = (obj) => ({ type: ADD_MAP, obj });
// const removeLocation = (locationId) => ({ type: REMOVE_LOCATION, locationId });

//associate a map to a user
export const addAMap = (obj) => {
	return async (dispatch) => {
		try {
			let res = await axios.post('/api/userMap/map', obj);
			dispatch(addMap(res.data));
		} catch (err) {
			console.log(err);
		}
	};
};

export const get = (mapId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/userMap/${mapId}`);
		dispatch(getMap(res.data));
	} catch (err) {
		console.log(err);
	}
};

export const add = (obj, mapId) => async (dispatch) => {
	try {
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

//this is getting a map and its locations inside the map
const defaultMap = {};
export default function mapReducer(state = defaultMap, action) {
	switch (action.type) {
		case GET_MAP:
			return action.map;
		case ADD_MAP:
			return action.obj;
		case ADD_LOCATION:
			return { ...state, locations: [...state.locations, action.location] };
		default:
			return state;
	}
}
