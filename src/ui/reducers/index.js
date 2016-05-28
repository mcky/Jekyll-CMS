import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import posts from './posts'
import settings from './settings'

const appReducer = combineReducers({
	routing: routerReducer,
	posts,
	settings,
})

export default appReducer
