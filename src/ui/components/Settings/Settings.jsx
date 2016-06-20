import React from 'react'
import {connect} from 'react-redux'

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
		<div className="MainPanel">

			<div className="NestedFieldEditor">
				<ul>
					{recursiveMapObj(settings,
						(keyName, value) => (
							<li className="Field">
								<span className="Field__label">{keyName}:</span>
								<input className="Field__input" value={value} onChange={function(){}} />
							</li>
						), (keyName, obj) => (
							<li className="Field">
								<span className="Field__label">{keyName}:</span>
								<ul>
									{obj}
								</ul>
							</li>
						)
					)}
				</ul>
			</div>
		</div>
	)
}

const mapStateToProps = ({settings}) => ({settings})
const connectedPost= connect(mapStateToProps)(Settings)

export {onSettingsEnter}
export default connectedPost
