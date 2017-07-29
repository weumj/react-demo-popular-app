import React from "react";
import PropTypes from  "prop-types";

const Repo = ({repo, index}) => (
	<li className="popular-item" >
		<div className="popular-rank">#{index + 1}</div>
		<ul className="space-list-items">
			<li>
				<img className="avatar" src={repo.owner.avatar_url} alt={`Avatar for ${repo.owner.login}`}/>
			</li>
			<li><a href={repo.html_url}>{repo.name}</a></li>
			<li>@{repo.owner.login}</li>
			<li>{repo.stargazers_count} stars</li>
		</ul>
	</li>
);

const RepoGrid = ({repos}) => (
	<ul className="popular-list">
		{repos.map((repo, i) => <Repo key={repo.name} repo={repo} index={i}/>)}
	</ul>
);

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired,
};

export default RepoGrid;