import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const PlayerPreview = ({id, avatar, username, onReset}) => (
	<div>
		<div className="column">
			<img className="avatar" src={avatar} alt={`Avatar for ${avatar}`}/>
			<h2 className="username">@{username}</h2>
		</div>
		<button className="reset" onClick={onReset.bind(null, id)}>Reset</button>
	</div>
);

PlayerPreview.propTypes = {
	id: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
};


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
		const {match} = this.props.match;
		const {playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state;

		return (
			<div>
				<div className="row">
					{!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmmit}/>}
					{
						playerOneImage !== null &&
						<PlayerPreview id="playerOne" avatar={playerOneImage} username={playerOneName}
									   onReset={this.handleReset}/>
					}
					{!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmmit}/>}
					{
						playerTwoImage &&
						<PlayerPreview id="playerTwo" avatar={playerTwoImage} username={playerTwoName}
									   onReset={this.handleReset}/>
					}
					{
						playerOneImage && playerTwoImage &&
						<Link className="button" to={
							{
								pathname: `${match.url}/results`,
								search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
							}
						}>Battle</Link>
					}
				</div>
			</div>
		);
	}
}
