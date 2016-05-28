import {fork} from 'redux-saga/effects'

import posts from './posts'
import settings from './settings'

export default function* rootSaga() {
	yield fork(posts)
	yield fork(settings)
}
