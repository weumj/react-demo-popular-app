import React, {Component} from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {createStructuredSelector} from 'reselect';
import {parse} from "query-string";
import {pipe} from "../../utils/Utils";

import Loading from "../../component/Loading";
import Player from "./Player";
import {selectLoading, selectError, selectPlayers} from "./selectors";
import {loadPlayer, /*playerLoaded, playerLoadError*/} from "./actions";


const getSearchParamFromQuery = ({location: {search}}) => search;

const loadPlayers = loadPlayerByNames => pipe(
	getSearchParamFromQuery,
	parse,
	loadPlayerByNames,
);

class Results extends Component {

	componentDidMount() {
		loadPlayers(this.props.loadPlayer);
	}

	render() {
		const {players: [winner, loser], error, loading} = this.state;

		if (loading) {
			return (<Loading/>);
		}

		if (error) {
			return (
				<div>
					<p>{error}</p>
					<Link to="/battle">Reset</Link>
				</div>
			);
		}

		const {score: winnerScore, profile: winnerProfile} = winner;
		const {score: loserScore, profile: loserProfile} = loser;

		return (
			<div className="row">
				<Player
					label="Winner"
					score={winnerScore}
					profile={winnerProfile}
				/>
				<Player
					label="Loser"
					score={loserScore}
					profile={loserProfile}
				/>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	players: selectPlayers(),
	loading: selectLoading(),
	error: selectError(),
});

const mapDispatchToProps = dispatch => ({
	loadPlayer: ({playerOneName, playerTwoName}) => dispatch(loadPlayer({playerOneName, playerTwoName})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
