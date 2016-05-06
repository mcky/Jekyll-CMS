import React, {Component} from 'react'
import {Provider} from 'react-redux'

import store from '../../scripts/store'
import Router from '../Router'

const App = () => (
	<Provider {...{store}}>
		<Router />
	</Provider>
)

export default App
