// Node.js Request Handler
const http = require('node:http')
const crypto = require('node:crypto')

const sleep = async (ms) => new Promise(res => setTimeout(res, ms))
const invalidateETag = (randomValue) => crypto.createHash('md5').update(JSON.stringify(randomValue)).digest('hex')
const generateRandomValue = () => Math.round(Math.random() * 1_000_000)

let randomValue = generateRandomValue()
console.log("🚀 ~ randomValue:", randomValue)
let etag = invalidateETag(randomValue)

setInterval(() => {
  randomValue = generateRandomValue()
  etag = invalidateETag(randomValue)
  console.log('Update cache!', randomValue)
}, 30_000)

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/content') {
    console.log('-----------[New request]-----------')

    if (req.headers['if-none-match'] === etag) {
      console.log(`Cache has been expired, but wasn't updated`)
      res.statusCode = 304
      res.end()
      return
    }

    await sleep(3000)

    res.setHeader('Cache-Control', ['public, max-age=60, stale-while-revalidate=10']);
    res.setHeader('ETag', etag);
    res.setHeader('Content-Type', ['text/html', 'charset=utf-8']);


    res.end(`<h1>Content ${randomValue} <h1>`)
  }
})

server.listen(3000, () => {
  console.log(`Node.js server running on http://localhost:${3000}`)
})
