// import { LOCATION_CHANGE } from 'react-router-redux';

import resultsReducer from "./containers/results/reducers";



// const routeInitialState = {
// 	locationBeforeTransitions: null,
// };

// const routeReducer = (state = routeInitialState, action) => {
// 	switch (action.type) {
// 		/* istanbul ignore next */
// 		case LOCATION_CHANGE:
// 			return state.merge({
// 				locationBeforeTransitions: action.payload,
// 			});
// 		default:
// 			return state;
// 	}
// };

export default function createReducer(asyncReducers) {
	// return combineReducers({
	// 	route: routeReducer,
	// 	global: resultsReducer,
	// 	...asyncReducers,
	// });
	return resultsReducer;
}