import {put} from 'redux-saga/effects'

import * as api from '../api'
import a from '../constants/actions'
import actions from '../actions'


function* fetchSettings() {
	const settings = yield api.fetchSettings()
	yield put(actions.setSettings(settings))
}


export default [
	[a.FETCH_SETTINGS, fetchSettings],
]
