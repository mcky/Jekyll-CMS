import {generateActions} from './utils'
import {actionNames} from '../constants/actions'

const actions = {}

const generatedActions = generateActions(actions, actionNames)

export default {
	...actions,
	...generatedActions,
}
