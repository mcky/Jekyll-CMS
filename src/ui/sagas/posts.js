import {takeEvery} from 'redux-saga'
import {fork, call, put} from 'redux-saga/effects'

import * as api from '../api'
import a from '../constants/actions'
import actions from '../actions'


function* fetchPosts() {
	const posts = yield api.fetchPosts()
	yield put(actions.setPosts({posts}))
}

function* fetchPost({slug}) {
	const post = yield api.fetchPost({slug})
	yield put(actions.setPost({post}))
}


// Check documentation for correct way to handle forks-in-forks when online
export default function* posts() {
	yield fork(function*() {yield* takeEvery(a.FETCH_POST, fetchPost)})
	yield fork(function*() {yield* takeEvery(a.FETCH_POSTS, fetchPosts)})
}
