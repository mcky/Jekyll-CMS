import merge from 'lodash/merge'
import {reducerUtil, mergeState, mergeStateRenameKeys} from './utils'

const reducers = {

	SET_POSTS: mergeState,

	SET_POST: mergeStateRenameKeys.bind(null, {post: 'currentPost'}),

	UPDATE_POST_INFO: (state, {payload}) => ({
		...state,
		currentPost: merge({}, state.currentPost, payload),
	}),

	UPDATE_POST_CONTENT: (state, {payload}) => ({
		...state,
		currentPost: {...state.currentPost, ...payload},
	}),
}

export default reducerUtil.bind(null, reducers)
