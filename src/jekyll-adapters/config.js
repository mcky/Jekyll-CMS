import fs from 'mz/fs'
import path from 'path'
import yaml from 'js-yaml'

// Temporary while rapidly testing
const baseDir = process.env.JEKYLL_DIR

const getConfig = () => {
	const configFile = path.join(baseDir, '_config.yml')

	return fs.readFile(configFile, 'utf8')
		.then(yaml.safeLoad)
		.catch(console.log)
}


export {
	getConfig
}
