import {reducerUtil} from './utils'


const reducers = {

	SET_POSTS: (state, {posts}) => ({
		...state,
		...posts,
	}),
}

export default reducerUtil.bind(null, reducers)
