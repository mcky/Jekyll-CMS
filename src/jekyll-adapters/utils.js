import path from 'path'

// Input  =>  '20156-04-25-some-blog-post-title.md'
// Output <=  '2015/04/25/some-blog-post-title.html'
const permalinkFromFilename = (filepath) => {
	const filename = path.parse(filepath).name
		, [y, m, d, ...nameFragments] = filename.split('-')

	return path.format({
		dir: [y, m, d].join('/'),
		name: nameFragments.join('-'),
		ext:'.html'
	})
}

const padNewlines = (input) => {
	const firstAndLast = [
		input.slice(0, 1),
		input.slice(-1),
	]

	return firstAndLast.reduce((str, slice, i) => {
		const replacement = (i === 0) ? `\n${str}` : `${str}\n`
		return (slice === '\n') ? str : replacement
	}, input)
}

export {
	permalinkFromFilename,
	padNewlines,
}
