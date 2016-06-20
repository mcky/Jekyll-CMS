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
		<div className="MainPanel ContentIndex">

			<table>
				<tbody>
					{props.posts.map(post => {
						const url = post.info.permalink ? `/posts/${post.info.permalink}` : '/404'

						return (
							<tr>
								<td>
									<Link to={url}>{post.info.title}</Link>
								</td>

								<td>
									{post.type === 'post' ? 'Published' : 'Draft'}
								</td>

								<td>
									$date
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

const mapStateToProps = (state) => ({posts: state.posts.posts})
const connectedPostIndex = connect(mapStateToProps)(PostIndex)

export {onPostIndexEnter}
export default connectedPostIndex
