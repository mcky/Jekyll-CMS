import keyMirror from '../utils/keymirror'

const actionNames = [
	'FETCH_POSTS',
	'SET_POSTS',
]

const actions = keyMirror(actionNames)

const actionTypes = actionNames.map(a => ({type: a}))


export default actions
export {
	actionTypes,
}
