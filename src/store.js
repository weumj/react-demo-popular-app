import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
	// 1. sagaMiddleware: Makes redux-sagas work
	// 2. routerMiddleware: Syncs the location/URL path to the state
	const middlewares = [
		sagaMiddleware,
	];

	const enhancers = [
		applyMiddleware(...middlewares),
	];

	const store = createStore(
		createReducer(),
		initialState,
		compose(...enhancers),
	);

	sagaMiddleware.run(rootSaga);

	// Extensions
	store.runSaga = sagaMiddleware.run;
	store.asyncReducers = {}; // Async reducer registry
	store.asyncSagas = {};

	// Make reducers hot reloadable, see http://mxs.is/googmo
	/* istanbul ignore next */
	if (module.hot) {
		module.hot.accept('./reducers', () => {
			import('./reducers').then((reducerModule) => {
				const createReducers = reducerModule.default;
				const nextReducers = createReducers(store.asyncReducers);

				store.replaceReducer(nextReducers);
			});
		});
	}

	return store;
}