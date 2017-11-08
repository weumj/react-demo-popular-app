import React from "react";
import PropTypes from "prop-types";

const PlayerPreview = ({avatar, username, children}) => (
	<div>
		<div className="column">
			<img className="avatar" src={avatar} alt={`Avatar for ${avatar}`}/>
			<h2 className="username">@{username}</h2>
		</div>
		{children}
	</div>
);

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};

export default PlayerPreview;