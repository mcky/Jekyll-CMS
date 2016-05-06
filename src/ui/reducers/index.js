import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import posts from './posts'

const appReducer = combineReducers({
	routing: routerReducer,
	posts,
})

export default appReducer
