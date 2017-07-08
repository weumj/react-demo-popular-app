import axios from "axios";

export const fetchPopularRepos = ({language}) => {
	const encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

	return (async () =>{
		const {data: {items}} = await axios.get(encodedURI);

		return items;
	})();
};
