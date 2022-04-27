import Fastify from "fastify"
import routes from './router/index.js'

const fastify = Fastify({ logger: true })

fastify.register(routes)

fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`服务器监听地址：${address}`)
})
