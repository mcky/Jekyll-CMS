import {reducerUtil, mergeState} from './utils'

const reducers = {

	SET_SETTINGS: mergeState,

}

export default reducerUtil.bind(null, reducers)
