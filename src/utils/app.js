/**
 * author: weely.cc
 * 工具包
 */

function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]'
}

function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]'
}

function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
}

function isPromise(val) {
    return Object.prototype.toString.call(val) === '[object Promise]'
}

function isFunction(val) {
    return Object.prototype.toString.call(val) === '[object Function]'
}

module.exports = {
    isObject,
    isArray,
    isFunction,
    isPromise,
    isString
}