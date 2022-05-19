/**
 * author: weely.cc
 * 工具包
 */
const uniqid = require('uniqid') 


function isString(val) {
    return Object.prototype.toString.call(val) === "[object String]"
}

function isObject(val) {
    return Object.prototype.toString.call(val) === "[object Object]"
}

function isArray(val) {
    return Object.prototype.toString.call(val) === "[object Array]"
}

function isPromise(val) {
    return Object.prototype.toString.call(val) === "[object Promise]"
}

function isAsyncFunction(val) {
    return Object.prototype.toString.call(val) === "[object AsyncFunction]"
}

function isFunction(val) {
    return Object.prototype.toString.call(val) === "[object Function]"
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}"
  let date
  if (typeof time === "object") {
    date = time
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/")
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value]
    }
    return value.toString().padStart(2, "0")
  })
  return time_str
}

// 生成16为长度唯一串
function generateOrderId() {
  const prefix = `OD${parseTime(new Date(), '{y}{m}{d}').substring(2)}`

  return uniqid.time(prefix)
}

function isNull (val) {
  return typeof val === 'undefined' || !val || val === '' || val === 'undefined'
}

function jsonStrify(Obj) {
  try {
    return JSON.stringify(Obj)
  } catch(e) {
    return ''
  }
}

function firstCharToUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function kebabToCamel(str) {
  return str.replace(/_\w/g, function (x) {
    return x.slice(1).toUpperCase();
  })
}

function formatKebabToCamelObj(data) {
  return Object.keys(data).reduce((p,c) => {
    const key = kebabToCamel(c)
    p[key] = data[c]
    return p
  }, {})
}

module.exports = {
  isObject,
  isArray,
  isFunction,
  isPromise,
  isAsyncFunction,
  isString,
  parseTime,
  generateOrderId,
  kebabToCamel,
  formatKebabToCamelObj,
  firstCharToUpper,
  isNull,
  jsonStrify
}
