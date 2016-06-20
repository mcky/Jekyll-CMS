import React from 'react'
import {connect} from 'react-redux'

import store from '../../scripts/store'
import actions from '../../actions'

const onPostEnter = (ns) => {
	const {slug} = ns.params
	store.dispatch(actions.fetchPost({slug}))
}

const Post = ({post}) => {
	if (!post) return <div/>

	const {info: {title}, content} = post

	return (
		<div className="MainPanel ContentEditor">

			<div className="Field">
				<label className="Field__label">Title</label>
				<input className="Field__input" value={title} />
			</div>

			<div className="Field Field--area">
				<label className="Field__label">Content</label>
				<textarea className="Field__input" defaultValue={content} />
			</div>
		</div>
	)
}

const mapStateToProps = ({posts}) => ({post: posts.currentPost})
const connectedPost= connect(mapStateToProps)(Post)

export {onPostEnter}
export default connectedPost
