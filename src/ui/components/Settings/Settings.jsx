import React from 'react'
import {connect} from 'react-redux'
import mapKeys from 'lodash/mapKeys'

import store from '../../scripts/store'
import actions from '../../actions'

const onSettingsEnter = () => {
	store.dispatch(actions.fetchSettings())
}

const mapObj = (obj, cb) => Object.keys(obj)
								.map((k, i, arr) => cb(k, obj[k], i, arr))


const recursiveMapObj = (obj, cb, nestedCb) => {
	return mapObj(obj, (key, val) => {

		if (Array.isArray(val)) {
			// Nothing yet
		} else if (typeof(val) === 'object') {
			return nestedCb(key, recursiveMapObj(val, cb, nestedCb))
		} else {
			return cb(key, val)
		}
	})
}

const Settings = ({settings}) => {
	if (!settings) return <div/>
	return (
		<div>
			Settings: <br />

			<ul>
				{recursiveMapObj(settings,
					(keyName, value) => (
						<li>{keyName}: {value}</li>
					), (keyName, obj) => (
						<li>
							{keyName}:
							<ul>
								{obj}
							</ul>
						</li>
					)
				)}
			</ul>
		</div>
	)
}

const mapStateToProps = ({settings}) => ({settings})
const connectedPost= connect(mapStateToProps)(Settings)

export {onSettingsEnter}
export default connectedPost
