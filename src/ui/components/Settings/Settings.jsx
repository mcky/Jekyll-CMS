import React from 'react'
import {connect} from 'react-redux'
import mapKeys from 'lodash/mapKeys'

import store from '../../scripts/store'
import actions from '../../actions'

const onSettingsEnter = () => {
	store.dispatch(actions.fetchSettings())
}

const Settings = ({settings}) => {
	if (!settings) return <div/>
	return (
		<div>
			{JSON.stringify(settings)}
		</div>
	)
}

const mapStateToProps = ({settings}) => ({settings})
const connectedPost= connect(mapStateToProps)(Settings)

export {onSettingsEnter}
export default connectedPost
