import { createSelector } from 'reselect';

const selectGlobal = () => state => state;

export const selectLoading = () => createSelector(
	selectGlobal(),
	globalState => globalState.loading,
);

export const selectError = () => createSelector(
	selectGlobal(),
	globalState => globalState.error,
);

export const selectPlayers = () => createSelector(
	selectGlobal(),
	globalState => globalState.players,
);

