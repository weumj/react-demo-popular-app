import React from "react";
import Profile from "./Profile";

const Player = ({label, score, profile}) => (
	<div>
		<h1 className="header">{label}</h1>
		<h3 style={{textAlign: "center"}}>Score: {score}</h3>
		<Profile info={profile}/>
	</div>
);

export default Player;
