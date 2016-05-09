import {takeEvery} from 'redux-saga'
import {call, put} from 'redux-saga/effects'

import actions, {actionTypes} from '../constants/actions'
const {FETCH_POSTS} = actions

function* fetchPosts() {
	console.log('fetchPosts')
}

// Check documentation for correct way to handle forks-in-forks when online
export default function* posts() {
	yield* takeEvery(FETCH_POSTS, fetchPosts)
}
