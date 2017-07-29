import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {parse} from "query-string";
import {pipe} from "./utils/Utils";
import {fetchBattles} from "./utils/api";
import PlayerPreview from "./component/PlayerPreview";

const playersAPI = pipe(
	({location: {search}}) => search,
	parse,
	({playerOneName, playerTwoName}) => [playerOneName, playerTwoName],
	fetchBattles,
);

const Profile = ({info: {avatar_url, login, name, location, company, followers, following, public_repos, blog,}}) => (
	<PlayerPreview
		avatar={avatar_url}
		username={login}>
		<ul className='space-list-items'>
			{name && <li>{name}</li>}
			{location && <li>{location}</li>}
			{company && <li>{company}</li>}
			<li>Followers: {followers}</li>
			<li>Following: {following}</li>
			<li>Public Repos: {public_repos}</li>
			{blog && <li><a href={blog}>{blog}</a></li>}
		</ul>
	</PlayerPreview>
);

Profile.propTypes = {
	info: PropTypes.object.isRequired,
};

const Player = ({label, score, profile}) => (
	<div>
		<h1 className="header">{label}</h1>
		<h3 style={{textAlign: "center"}}>Score: {score}</h3>
		<Profile info={profile}/>
	</div>
);

export default class Results extends Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true,
		};
	}

	componentDidMount() {
		(async () => {
			const results = await playersAPI(this.props);

			if (!results) {
				return this.setState(prevState => ({
					...prevState,
					loading: false,
					error: "Looks like there was a error, Check that both user exist on Github."
				}));
			}

			const [winner, loser] = results;

			this.setState(prevState => ({
				...prevState,
				loading: false,
				error: null,
				winner,
				loser,
			}));
		})();
	}

	render() {
		const {winner, loser, error, loading} = this.state;

		if (loading) {
			return (<p>Loading</p>);
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