/** @format */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateAMap from './CreateAMap';
import Navbar from './Navbar';
import Header from './Header';
import Login from './Login';

export default class Routes extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					<Navbar />
					<Switch>
						<Route exact path="/" component={CreateAMap} />
						<Route exact path="/createamap" component={CreateAMap} />
						<Route path="/login" component={Login} />
					</Switch>
				</div>
			</Router>
		);
	}
}
