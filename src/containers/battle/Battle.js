import React, {Component} from "react";
import PropTypes from "prop-types";
import PlayerInput from "../../component/player/PlayerInput";
import {Link} from "react-router-dom";
import PlayerPreview from "../../component/player/PlayerPreview";



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

	handleSubmit = ({id, username}) =>
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
					{!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit}/>}
					{
						playerOneImage !== null &&
						<PlayerPreview
							avatar={playerOneImage}
							username={playerOneName}
						>
							<button className="reset" onClick={this.handleReset.bind(null, "playerOne")}>Reset</button>
						</PlayerPreview>
					}
					{!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit}/>}
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
