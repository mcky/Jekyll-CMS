import mapKeys from 'lodash/mapKeys'


const reducerUtil = (reducers, state = {}, action) => {
	const reducerFn = reducers[action.type]
	return reducerFn ? (reducerFn(state, action)) : state
}

const mergeState = (state, action) => {
	const {type, ...data} = action
	return {
		...state,
		...data,
	}
}

const mergeStateRenameKeys = (replacements, state, action) => {
	const replaced = mapKeys(action, (v, k) => replacements[k] ? replacements[k] : k)
	return mergeState(state, replaced)
}

export {
	reducerUtil,
	mergeState,
	mergeStateRenameKeys,
}
