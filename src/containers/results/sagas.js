import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {LOAD_PLAYER} from "./constants";
import {playerLoaded, playerLoadError} from "./actions";
import {selectPlayers} from "./selectors";
import {fetchBattles} from "../../utils/api";

// should not
export function* getPlayers({playerOneName, playerTwoName}) {
	// const playerNames = yield select(/*selectPlayers()*/);

	// const players = yield call(fetchBattles, playerNames);
	const players = yield call(fetchBattles, [playerOneName, playerTwoName]);

	if (!players) {
		yield put(playerLoadError());
	} else {
		yield put(playerLoaded(players));
	}
}

export function* getPlayersWatcher() {
	while (true) {
		const {payload} = yield take(LOAD_PLAYER);
		yield call(getPlayers, payload);
	}
}

export function* mainSaga() {
	// Fork watcher so we can continue execution
	const watcher = yield fork(getPlayersWatcher);

	// Suspend execution until location changes
	yield take(LOCATION_CHANGE);
	yield cancel(watcher);
}
