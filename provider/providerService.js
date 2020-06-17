const { server } = require('./provider.js')
const port = 9123

server.listen(port, () => {
  console.log(`Provider Service listening on http://localhost:${port}`)
})
