import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Nav from "./Nav";
import Home from "./Home";
import Battle from "./Battle";
import PopularList from "./component/PopularList";
import Results from "./Results";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			languages: ["ALL", "JavaScript", "Ruby", "Java", "CSS", "Python"]
		};
	}

	render() {
		const {languages} = this.state;

		return (
			<Router history="">
				<div className="container">
					<Nav/>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route exact path="/battle" component={Battle}/>
						<Route path="/battle/results" component={Results}/>
						<Route path="/popular" render={() => <PopularList languages={languages}/>}/>
						<Route render={() => <p>Not Found</p>}/>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
