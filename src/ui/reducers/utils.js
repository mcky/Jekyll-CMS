import mapKeys from 'lodash/mapKeys'


const reducerUtil = (reducers, state = {}, action) => {
	const reducerFn = reducers[action.type]
	return reducerFn ? (reducerFn(state, action)) : state
}

const mergeState = (state, {payload}) => {
	return {
		...state,
		...payload,
	}
}


const mergeStateRenameKeys = (replacements, state, {payload}) => {
	const replaced = mapKeys(payload, (v, keyName) => replacements[keyName] || keyName)
	return mergeState(state, {payload: replaced})
}

export {
	reducerUtil,
	mergeState,
	mergeStateRenameKeys,
}
