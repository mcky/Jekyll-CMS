import mapValues from 'lodash/mapValues'
import keyMirror from '../utils/keymirror'

const actionNames = [
	'FETCH_POSTS',
	'SET_POSTS',

	'FETCH_POST',
	'SET_POST',
]

const actions = keyMirror(actionNames)

const actionTypes = mapValues(actions, (k, v) => ({type: v}))


export default actions
export {
	actionNames,
	actionTypes,
}
