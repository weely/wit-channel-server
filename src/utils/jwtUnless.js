
/**
 * whiteRoutes: [{path: string|Regexp, method?: Array|string }]
 * @param {*} ctx 
 * @returns 
 */
module.exports = function customJwtUnless(ctx) {
  try {
    const { whiteRoutes } = require('../config/config')
    const { path, method } = ctx
  
    for (let router of whiteRoutes) {
      const { path: allowPaths, method: allowMethods } = router
      const matchPath = typeof allowPaths === 'string' ? allowPaths === path : allowPaths.test(path)

      if (matchPath) {
        console.log(router, allowMethods, typeof allowMethods === 'string')
        // 没有method参数时，默认get方法
        let matchMethod = false
        if (allowMethods) {
          matchMethod = typeof allowMethods === 'string' ? allowMethods.toUpperCase() === allowMethods.toUpperCase() : allowMethods.includes(method.toUpperCase())
        } else {
          matchMethod = method.toUpperCase() === 'GET'
        }

        return matchMethod
      }
    }
  } catch(err) {
    console.log(err)
  }

  return false
}
