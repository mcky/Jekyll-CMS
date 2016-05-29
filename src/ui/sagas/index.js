import {takeEvery} from 'redux-saga'

import posts from './posts'
import settings from './settings'

const sagas = [].concat(posts, settings)

export default function* rootSaga() {
	yield sagas.map(function* ([action, handler]) {
		yield* takeEvery(action, handler)
	})
}
