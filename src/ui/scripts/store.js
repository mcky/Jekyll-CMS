import {createStore, applyMiddleware} from 'redux'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import initialState from '../constants/initialState'
import rootSaga from '../sagas'
import reducers from '../reducers'

const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = applyMiddleware(
	sagaMiddleware,
)(createStore)

const store = createStoreWithMiddleware(
	reducers,
	initialState,
	window.devToolsExtension ? window.devToolsExtension() : f => f
)

sagaMiddleware.run(rootSaga)

export default store

