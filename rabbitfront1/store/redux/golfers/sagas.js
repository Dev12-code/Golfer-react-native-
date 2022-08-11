import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { request } from '../../../utils/http';
import * as actions from './actions';
import * as constants from '../../constants';
import { getServerError } from '../../../utils/helpers';

function allGolfers() {
	console.log("API URL : allGolfers : /golfers")
	return request.get('/golfers');
}

function* handleAllGolfers() {
	try {
		const result = yield call(allGolfers);
		// console.log("API Result : allGolfers : ",result);
		yield put(actions.getAllGolfersSuccess(result.data));
	} catch (err) {
		const error =
			getServerError(err.response.data.message) ||
			JSON.stringify(err.response || err);
		yield put(
			actions.getAllGolfersError(
				error || 'An error occurred when trying to get golfers'
			)
		);
	}
}

function golfer({ payload }) {
	console.log("API URL : golfer : ",`/golfers/${payload}/profile`)
	return request.get(`/golfers/${payload}/profile`);
}

function* handleGolfer(payload) {
	try {
		const result = yield call(golfer, payload);
		// console.log("API URL Result : golfer : ",result)
		if (result.data && result.data.length !== 0) {
			yield put(actions.getGolferSuccess(result.data[0]));
		} else {
			yield put(
				actions.getGolferError('An error occurred when trying to get golfers')
			);
		}
	} catch (err) {
		const error =
			getServerError(err.response.data.message) ||
			JSON.stringify(err.response || err);
		yield put(
			actions.getGolferError(
				error || 'An error occurred when trying to get golfers'
			)
		);
	}
}

export default [
	takeLatest(constants.GET_GOLFER, handleGolfer),
	takeLatest(constants.GET_ALL_GOLFERS, handleAllGolfers),
];
