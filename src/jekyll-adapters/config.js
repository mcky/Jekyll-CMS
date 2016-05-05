import fs from 'mz/fs'
import yaml from 'js-yaml'

import {absDirectoryStructure} from './utils'

const configFile = absDirectoryStructure.config

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
