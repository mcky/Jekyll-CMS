import req from 'superagent'


const defaultHeaders = {}

const handleApiResponse = (options, resolve, reject) => {
	const {body, url, method, headers, query} = options
	const request = req(method, url)

	request
		.type('json')
		.set(headers)
		.query(query)
		.send(body)

	request
		.end((err, resp) => {
			if (err) {
				reject(err)
			} else {
				const data = JSON.parse(resp.text)
				if (resp.statusCode >= 200 && resp.statusCode < 400) {
					resolve(data)
				} else {
					reject({
						status: resp.statusCode,
						error: data,
					})
				}
			}
		})
}

const apiRequest = (options) => {
	const {url, method, headers, query, ...optionsTwo} = options

	const newOptions = {
		...options,
		method: method || 'GET',
		query: query || {},
		headers: {
			...headers,
			...defaultHeaders,
		},
		json: true,
		url,
	}

	return new Promise((resolve, reject) => handleApiResponse(newOptions, resolve, reject))
}

export default apiRequest
