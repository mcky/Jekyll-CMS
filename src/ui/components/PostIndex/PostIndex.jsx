import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import store from '../../scripts/store'
import actions from '../../actions'

const onPostIndexEnter = () => {
	store.dispatch(actions.fetchPosts())
}


const PostIndex = (props) => {
	return (
		<div>
			Posts

			{props.posts.map(post => {
				const url = `/posts/${post.info.permalink}` || '/posts/404'

				return (
					<div>
						<Link to={url}>
							{post.info.title}
						</Link>
					</div>
				)
			})}
		</div>
	)
}

const mapStateToProps = (state) => ({posts: state.posts.posts})
const connectedPostIndex = connect(mapStateToProps)(PostIndex)

export {onPostIndexEnter}
export default connectedPostIndex
