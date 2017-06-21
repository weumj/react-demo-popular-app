import React, {Component} from 'react';
import './App.css';
import PopularList from "./component/PopularList";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			languages: ["ALL", "JavaScript", "Ruby", "Java", "CSS", "Python"]
		};
	}

	render() {
		return (
			<div className="container">
				<PopularList languages={this.state.languages}/>
			</div>
		);
	}
}

export default App;
