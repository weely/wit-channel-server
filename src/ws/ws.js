const WebSocket = require('ws')

const ws = new WebSocket.Server({ port: 3002 })

ws.on('connection', ws => {
  console.log('server connection')

  ws.on('message', msg => {
    console.log('server receive msg：', msg)
  })

  ws.send('Information from the server')
})
