import map from 'lodash/map'
import camelCase from 'lodash/camelCase'

/**
 * Takes user-defined actions and the names of all actions and returns
 * basic action creators for each that isn't already defined
 *
 * @param {object} actions - User defined actions
 * @param {array} actionNames - List of action constants
 * @return {object} - An object of camelCased actions
 */
const generateActions = (actions, actionNames) => {
	// Calling each action may be a bottleneck with many actions
	const existingActions = map(actions, a => a().type)

	const toMakeActionsFor = actionNames.filter(name => !~existingActions.indexOf(name))

	const newActions = toMakeActionsFor.reduce((acs, type) => ({
		...acs,
		[camelCase(type)]: (payload) => ({type, ...payload}),
	}), {})

	return newActions
}

export {
	generateActions,
}
