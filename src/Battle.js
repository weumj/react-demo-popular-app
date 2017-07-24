import React, {Component} from "react";
import "./Battle.css";
import PropTypes from "prop-types";

class PlayerInput extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			username: "",
		};
	}

	handleChange = ({target: {value: username}}) => this.setState(prevState => ({...prevState, username}));

	handleSubmit = e => {
		e.preventDefault();

		const {id, onSubmit} = this.props;
		const {username} = this.state;

		onSubmit({
			id,
			username,
		});
	};

	render() {
		const {id, label, onSubmit} = this.props;
		const {username} = this.state;

		return (
			<form className="column" onSubmit={this.handleSubmit}>
				<label className="header" htmlFor="username">
					{label}
				</label>
				<input
					id="username"
					placeholder="github username"
					type="text"
					autoComplete="off"
					value={username}
					onChange={this.handleChange}
				/>
				<button className="button" type="summit" disabled={!username}>Submit</button>
			</form>
		);
	}
}

export default class extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playerOneName: "",
			playerTwoName: "",
			playerOneImage: null,
			playerTwoImage: null,
		};
	}

	handleSubmmit = ({id, userName}) =>
		this.setState(prevState => ({
			...prevState,
			[`${id}Name`]: userName,
			[`${id}Image`]: `https://github.com/${userName}.png?size=200`,
		}));

	render() {
		const {playerOneName, playerTwoName} = this.state;

		return (
			<div>
				<div className="row">
					{!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmmit}/>}
					{!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmmit}/>}
				</div>
			</div>
		);
	}
}
