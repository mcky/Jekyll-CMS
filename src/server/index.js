import express from 'express'
import http from 'http'

import routes from './routes';


const app = express()

app.server = http.createServer(app)
app.use('/', routes)
// app.server.listen(process.env.PORT || 8080)
