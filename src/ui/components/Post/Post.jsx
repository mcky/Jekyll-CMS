import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import store from '../../scripts/store'
import actions from '../../actions'

const onPostEnter = (ns) => {
	const {slug} = ns.params
	store.dispatch(actions.fetchPost({slug}))
}

const Post = ({post, actions}) => {
	if (!post) return <div/>

	const {info: {title}, content} = post

	const onInfoChange = (field, evt) => actions.updatePostInfo(field, evt.target.value)
	const onContentChange = (evt) => actions.updatePostContent(evt.target.value)

	return (
		<div className="MainPanel ContentEditor">

			<div className="Field">
				<label className="Field__label">Title</label>
				<input className="Field__input" value={title} onChange={onInfoChange.bind(null, 'title')} />
			</div>

			<div className="Field Field--area">
				<label className="Field__label">Content</label>
				<textarea className="Field__input" onChange={onContentChange} value={content} />
			</div>
		</div>
	)
}

const mapStateToProps = ({posts}) => ({post: posts.currentPost})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		updatePostInfo: actions.updatePostInfo,
		updatePostContent: actions.updatePostContent,
	}, dispatch),
})
const connectedPost = connect(mapStateToProps, mapDispatchToProps)(Post)

export {onPostEnter}
export default connectedPost
