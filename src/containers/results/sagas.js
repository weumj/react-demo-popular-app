import {take, call, put, select, fork, cancel} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {LOAD_PLAYER} from "./constants";
import {playerLoaded, playerLoadError} from "./actions";
import {selectPlayers} from "./selectors";
import {fetchBattles} from "../../utils/api";

export function* getPlayers() {
	const playerNames = yield select(selectPlayers());

	const players = yield call(fetchBattles, playerNames);

	if (!players) {
		yield put(playerLoadError());
	} else {
		yield put(playerLoaded());
	}
}

export function* getPlayersWatcher() {
	while (yield take(LOAD_PLAYER)) {
		yield call(getPlayers);
	}
}

export function* mainSaga() {
	// Fork watcher so we can continue execution
	const watcher = yield fork(getPlayersWatcher);

	// Suspend execution until location changes
	yield take(LOCATION_CHANGE);
	yield cancel(watcher);
}
