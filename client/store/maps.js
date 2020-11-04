/** @format */

import axios from 'axios';

const GET_MAPS = 'GET_MAPS';
const REMOVE_MAP = 'REMOVE_MAP';
const ADD_MAP = 'ADD_MAP';

const getMaps = (arrOfObj) => ({ type: GET_MAPS, arrOfObj });
const addMap = (obj) => ({ type: ADD_MAP, obj });

export const fetchMaps = () => {
	return async (dispatch) => {
		const response = await axios.get(`/api/userMaps/`);
		dispatch(getMaps(response.data));
	};
};

export const addMapToMaps = (obj) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`/api/userMaps/`, obj);
			dispatch(addMap(response.data));
		} catch (err) {
			console.log(err);
		}
	};
};

// export const deleteMap = (id) => {
// 	return async (dispatch, getState) => {
// 		try {
// 			await axios.delete(
// 				`https://gobark-backend.herokuapp.com/api/photos/${id}`
// 			);
// 			dispatch({
// 				type: REMOVE_PHOTOS,
// 				id,
// 				state: getState,
// 			});
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	};
// };

const maps = [];

export default function mapsReducer(state = maps, action) {
	switch (action.type) {
		case GET_MAPS:
			return action.arrOfObj;
		// case REMOVE_PHOTOS:
		// 	let removed = [
		// 		...state.filter((object) => {
		// 			return object.id !== action.id;
		// 		}),
		// 	];
		// 	return removed;
		case ADD_MAP:
			return [...state, action.obj];

		default:
			return state;
	}
}
