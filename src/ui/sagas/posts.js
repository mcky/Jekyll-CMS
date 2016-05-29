import {put} from 'redux-saga/effects'

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

export default [
	[a.FETCH_POSTS, fetchPosts],
	[a.FETCH_POST, fetchPost],
]
