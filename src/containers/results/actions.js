import {LOAD_PLAYER, PLAYER_LOADED, PLAYER_LOAD_ERROR} from "./constants";

export const loadPlayer = ({playerOneName, playerTwoName}) => ({
	type: LOAD_PLAYER,
	payload: {playerOneName, playerTwoName},
});

export const playerLoaded = () => ({
	type: PLAYER_LOADED,
});

export const playerLoadError = () => ({
	type: PLAYER_LOAD_ERROR,
});