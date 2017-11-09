import {fork} from 'redux-saga/effects';
import {mainSaga} from "./containers/results/sagas";

export default function* rootSaga() {
	yield fork(mainSaga);
}
