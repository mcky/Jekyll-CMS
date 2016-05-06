const reducerUtil = (reducers, state = {}, action) => {
	const reducerFn = reducers[action.type]
	return reducerFn ? (reducerFn(state, action)) : state
}

export {
	reducerUtil,
}
