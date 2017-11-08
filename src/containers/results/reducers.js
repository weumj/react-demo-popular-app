// @flow

import {LOAD_PLAYER, PLAYER_LOADED, PLAYER_LOAD_ERROR} from "./constants";

type State = {
	loading: boolean,
	error: string,
	players: Array,
};

type Action = {
	type: string,
	payload: ?any,
};

const initState: State = {
	loading: false,
	error: false,
	players: []
};

const reducer = (state: State = initState, action: Action): State => {
	switch (action.type) {
		case LOAD_PLAYER:
			return {...state, loading: true, error: null, players: []};
		case PLAYER_LOAD_ERROR:
			return {...state, loading: false, error: "Looks like there was a error, Check that both user exist on Github."};
		case PLAYER_LOADED:
			return {...state, loading: false, error: null, players: action.payload.players};
	}

	return state;
};

export default reducer;
