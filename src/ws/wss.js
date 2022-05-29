const WebSocket = require('ws')
const { createServer } = require('https')
const { readFileSync } = require('fs')
const path = require('path')
const { WebSocketServer } = require('ws')
const { wssPort } = require('../config/config')
const Order = require('../models/orders')


const server = createServer({
  cert: readFileSync(path.join(__dirname, '../../ssl/7604531_weely.cc.pem')),
  key: readFileSync(path.join(__dirname, '../../ssl/7604531_weely.cc.key'))
})

const wss = new WebSocketServer({ server })

wss.on('connection', function connection(ws, request) {
  const url = request.url

  ws.on('message', function message(data) {
    try{
      // 1、用户下单后推送给师傅确认接收订单
      if (/^\/notifyConfirmOrder\//.test(url)) {
        console.log('received: %s', data)
      }

      // 2、师傅接收订单后推送给用户
      if (/^\/notifyPayOrder\//.test(url)) {
        // data为string，心跳链接
        if (typeof data === 'string') { 
          console.log('received: %s', data)
          return
        }
        const obj = JSON.parse(data)
        // 发送
        if (obj.id) {
          let timer = setInterval(async() => {
            const order = await Order.findByPk(obj.id, {
              attributes: ['id','status'],
              raw: true
            })
            if (!order) {
              const sendObj = {
                msg: '订单无效'
              }
              ws.send(JSON.stringify(sendObj))
              clearInterval(timer)
              timer = null
            } else if (+order.status === 1) {
              const sendObj = {
                ...order,
                msg: '已接单'
              }
              ws.send(JSON.stringify(sendObj))
              clearInterval(timer)
              timer = null
            } else if (+order.status === 2) {
              const sendObj = {
                ...order,
                msg: '已取消'
              }
              ws.send(JSON.stringify(sendObj))
              clearInterval(timer)
              timer = null
            }
          }, 2000)
        }
      }
    }catch(err) {
      console.log(err)
    }
  })
})

server.listen(wssPort)
console.log(`wss is running at wss://weely.cc:${wssPort}`)
