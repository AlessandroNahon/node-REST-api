const http = require('http')
const router = require('./router')

const server = http.createServer((req, res) => router(req, res))

const PORT = process.env.PORT || 5000

server.listen(PORT)
