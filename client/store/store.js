/** @format */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
//import appReducer from './store'
import { createLogger } from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import userReducer from './user';
import mapReducer from './map';
import mapsReducer from './maps';

let middleware = [
	// `withExtraArgument` gives us access to axios in our async action creators!
	// https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
	thunkMiddleware.withExtraArgument({ axios }),
];
// if (process.browser) {
// 	// We'd like the redux logger to only log messages when it's running in the
// 	// browser, and not when we run the tests from within Mocha.
// 	middleware = [...middleware, createLogger({ collapsed: true })];
// }

const rootReducer = combineReducers({
	user: userReducer,
	map: mapReducer,
	maps: mapsReducer,
});

const store = createStore(
	rootReducer,
	// 👇 This uses the Redux DevTools extension, assuming you have it installed in your browser.
	// 👇 See: https://github.com/zalmoxisus/redux-devtools-extension
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
