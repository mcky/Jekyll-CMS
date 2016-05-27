import React, {Component} from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import store from '../../scripts/store'

import Wrapper from '../Wrapper'
import Dashboard from '../Dashboard'
import PostIndex, {onPostIndexEnter} from '../PostIndex'
import Post, {onPostEnter} from '../Post'

const history = syncHistoryWithStore(browserHistory, store)

const AppRouter = () => (
	<Router history={history} >
		<Route path="/" component={Wrapper}>
			<IndexRoute component={Dashboard} />
			<Route path="posts" component={PostIndex} onEnter={onPostIndexEnter} />
			<Route path="posts/:slug" component={Post} onEnter={onPostEnter} />
		</Route>
	</Router>
)

export default AppRouter
