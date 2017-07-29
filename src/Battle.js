import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import PlayerPreview from "./component/PlayerPreview";


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
		const {label} = this.props;
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

export default class Battle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			playerOneName: "",
			playerTwoName: "",
			playerOneImage: null,
			playerTwoImage: null,
		};
	}

	handleSubmmit = ({id, username}) =>
		this.setState(prevState => ({
			...prevState,
			[`${id}Name`]: username,
			[`${id}Image`]: `https://github.com/${username}.png?size=200`,
		}));

	handleReset = id =>
		this.setState(prevState => ({
			...prevState,
			[`${id}Name`]: "",
			[`${id}Image`]: null,
		}));

	render() {
		const {match} = this.props;
		const {playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state;

		return (
			<div>
				<div className="row">
					{!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmmit}/>}
					{
						playerOneImage !== null &&
						<PlayerPreview
							avatar={playerOneImage}
							username={playerOneName}
						>
							<button className="reset" onClick={this.handleReset.bind(null, "playerOne")}>Reset</button>
						</PlayerPreview>
					}
					{!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmmit}/>}
					{
						playerTwoImage &&
						<PlayerPreview
							avatar={playerTwoImage}
							username={playerTwoName}
						>
							<button className="reset" onClick={this.handleReset.bind(null, "playerTwo")}>Reset</button>
						</PlayerPreview>
					}
					{
						playerOneImage && playerTwoImage &&
						<Link
							className="button"
							to={{
								pathname: `${match.url}/results`,
								search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
							}}
						>Battle</Link>
					}
				</div>
			</div>
		);
	}
}
