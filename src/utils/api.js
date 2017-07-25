import axios from "axios";

export const fetchPopularRepos = ({language}) => {
	const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

	return (async () => {
		const {data: {items}} = await axios.get(encodedURI);

		return items;
	})();
};

const id = "";
const sec = "";
const params = `?client_id=${id}&client_secret=${sec}`;

const getProfile = username => axios.get(`https://api.github.com/users/${username}${params}`).then(({data}) => data);
const getRepos = username => axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
const getStarCounts = ({data}) => data.reduce((count, {startgazers_count}) => count + startgazers_count, 0);
const calculateScore = ({followers}, repos) => followers * 3 + getStarCounts(repos);
const sortPlayers = players => players.sort(({score: a}, {score: b}) => b - a);

const handleError = error => {
	console.warn(error);
	return null;
};

const getUserData = async player => {
	const [profile, repos] = await axios.all([getProfile(player), getRepos(player)]);

	return {
		profile,
		score: calculateScore(profile, repos),
	};
};

export const fetchBattles = players => axios.all(players.map(getUserData)).then(sortPlayers, handleError);