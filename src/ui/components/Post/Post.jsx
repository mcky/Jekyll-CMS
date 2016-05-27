import React from 'react'
import {connect} from 'react-redux'

import store from '../../scripts/store'
import actions from '../../actions'

const onPostEnter = (ns) => {
	const {slug} = ns.params
	store.dispatch(actions.fetchPost({slug}))
}


const Post = (props) => {
	return (
		<div>
			{props.post ? props.post.content : null}
		</div>
	)
}

const mapStateToProps = ({posts}) => ({post: posts.currentPost})
const connectedPost= connect(mapStateToProps)(Post)

export {onPostEnter}
export default connectedPost
