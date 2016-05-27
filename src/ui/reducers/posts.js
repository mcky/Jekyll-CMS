import {reducerUtil, mergeState, mergeStateRenameKeys} from './utils'

const reducers = {

	SET_POSTS: mergeState,

	SET_POST: mergeStateRenameKeys.bind(null, {post: 'currentPost'}),
}

export default reducerUtil.bind(null, reducers)
