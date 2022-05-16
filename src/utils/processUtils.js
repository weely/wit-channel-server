/**
 * 解析命令行中 k=v 的参数
 * @param {*} args 
 * @returns node命令行进程参数对象 Object
 */
 function parseProcessArgs(args) {
  const arguments = args.slice(2)

  return arguments.reduce((pre, cur) => {
    const [k, v] = cur.split('=')
    pre[k] = v
    return pre
  }, {})
}

module.exports = {
  parseProcessArgs,
}