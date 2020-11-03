/** @format */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateAMap from './CreateAMap';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Welcome from './Welcome';
import Home from './Home';
import Header from './Header';
import CreateANewMap from './CreateANewMap';
import SingleMap from './SingleMap';

export default class Routes extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					<Navbar />
					<Switch>
						<Route exact path="/" component={Welcome} />
						<Route path="/createamap" component={CreateAMap} />
						<Route path="/login" component={Login} />
						<Route path="/signup" component={Signup} />
						<Route path="/home" component={Home} />
						<Route path="/createanewmap" component={CreateANewMap} />
						<Route path="/singlemap/:id" component={SingleMap} />
					</Switch>
				</div>
			</Router>
		);
	}
}
