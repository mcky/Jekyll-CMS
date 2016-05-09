import React from 'react'
import {connect} from 'react-redux'
import store from '../../scripts/store'


const onPostsEnter = () => {
	store.dispatch({type: 'FETCH_POSTS'})
}

const Posts = (props) => {
	return (
		<div>
			Posts
		</div>
	)
}

const mapStateToProps = ({posts}) => ({posts})
const connectedPosts = connect(mapStateToProps, (dispatch => ({dispatch})))(Posts)

export {onPostsEnter}
export default connectedPosts
