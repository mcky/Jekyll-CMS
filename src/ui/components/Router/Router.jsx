import React, {Component} from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import store from '../../scripts/store'

import Wrapper from '../Wrapper'
import Dashboard from '../Dashboard'
import Posts, {onPostsEnter} from '../Posts'

const history = syncHistoryWithStore(browserHistory, store)

const AppRouter = (props) => (
	<Router history={history} >
		<Route path="/" component={Wrapper}>
			<IndexRoute component={Dashboard} />
			<Route path="posts" component={Posts} onEnter={onPostsEnter} />
		</Route>
	</Router>
)

export default AppRouter
