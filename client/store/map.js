/** @format */

import axios from 'axios';

const ADD_MAP = 'ADD_MAP';

const addMap = (obj) => ({ type: ADD_MAP, obj });

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

const defaultMap = {};
export default function mapReducer(state = defaultMap, action) {
	switch (action.type) {
		case ADD_MAP:
			return action.obj;
		default:
			return state;
	}
}
