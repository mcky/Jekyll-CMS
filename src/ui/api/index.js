import apiRequest from './handlers'

const fetchPosts = () => {
	const options = {
		url: '/api/posts',
	}
	return apiRequest(options)
}

const fetchPost = ({slug}) => {
	const options = {
		url: `/api/posts/${slug}`,
	}
	return apiRequest(options)
}

export {
	fetchPosts,
	fetchPost,
}
