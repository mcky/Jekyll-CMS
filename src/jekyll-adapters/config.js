import fs from 'mz/fs'
import path from 'path'
import yaml from 'js-yaml'

// Temporary while rapidly testing
const baseDir = process.env.JEKYLL_DIR
const configFile = path.join(baseDir, '_config.yml')

const getConfig = () => {
	return fs.readFile(configFile, 'utf8')
		.then(yaml.safeLoad)
		.catch(console.log)
}

const setConfig = (config) => {
	const yamlText = yaml.safeDump(config)

	return fs.writeFile(configFile, yamlText, 'utf8')
		.catch(console.log)
}

export {
	getConfig,
	setConfig,
}
