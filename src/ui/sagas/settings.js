import {takeEvery} from 'redux-saga'
import {fork, call, put} from 'redux-saga/effects'

import * as api from '../api'
import a from '../constants/actions'
import actions from '../actions'


function* fetchSettings() {
	const settings = yield api.fetchSettings()
	yield put(actions.setSettings(settings))
}


// Check documentation for ceorrect way to handle forks-in-forks when online
export default function* settings() {
	yield fork(function*() {yield* takeEvery(a.FETCH_SETTINGS, fetchSettings)})
}
