import {generateActions} from './utils'
import actions, {actionNames} from '../constants/actions'

const customActions = {

	updatePostInfo: (field, content) => ({
		type: actions.UPDATE_POST_INFO,
		payload: {
			info: {
				[field]: content,
			},
		},
	}),

	updatePostContent: (content) => ({
		type: actions.UPDATE_POST_CONTENT,
		payload: {content},
	}),

}

const generatedActions = generateActions(customActions, actionNames)

export default {
	...customActions,
	...generatedActions,
}
