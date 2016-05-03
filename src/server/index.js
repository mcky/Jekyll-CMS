import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'

import routes from './routes';
import db, {bootstrap} from './db'

const app = express()

app.server = http.createServer(app)
app.use(bodyParser.json())
app.use('/', routes)

bootstrap()
	.then(() => {
		app.server.listen(process.env.PORT || 8080)
	})
