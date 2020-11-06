/** @format */

import axios from 'axios';
import history from '../history';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const getUser = (obj) => ({ type: GET_USER, user: obj });
const removeUser = () => ({ type: REMOVE_USER });

//get logged in user's info
export const me = () => {
	return async (dispatch) => {
		try {
			const res = await axios.get('/auth/me');
			dispatch(getUser(res.data || defaultUser));
		} catch (err) {
			console.error(err);
		}
	};
};

//login
export const login = (email, password) => async (dispatch) => {
	try {
		let object = { email, password };
		let res = await axios.post(`/auth/login`, object);
		dispatch(getUser(res.data));
		history.push('/');
	} catch (err) {
		console.log(err);
		history.push('/login');
	}
};

// signup;
export const signup = (email, password) => async (dispatch, getState) => {
	try {
		let object = { email, password };
		let res = await axios.post(`/auth/signup`, object);
		dispatch(getUser(res.data));
		history.push('/home');
	} catch (dispatchOrHistoryErr) {
		console.log(dispatchOrHistoryErr);
	}
};

//logout
export const logout = () => async (dispatch) => {
	try {
		await axios.post('/auth/logout');
		dispatch(removeUser());
		history.push('/');
	} catch (err) {
		console.error(err);
	}
};




const defaultUser = {};
export default function userReducer(state = defaultUser, action) {
	switch (action.type) {
		case GET_USER:
			return action.user;
		case REMOVE_USER:
			return defaultUser;
		default:
			return state;
	}
}
