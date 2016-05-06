import {createStore, applyMiddleware} from 'redux'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import reducers from '../reducers/'

const initialState = {}

const createStoreWithMiddleware = applyMiddleware(
)(createStore)

const store = createStoreWithMiddleware(
	reducers,
	initialState,
	window.devToolsExtension ? window.devToolsExtension() : f => f
)

export default store

