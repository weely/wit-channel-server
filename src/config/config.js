const defaultConfig = require('./default')

const envConfig = process.env.NODE_ENV === 'production' ? require('./production') : require('./development')

function mergeConfig(config, mergeObj) {
  for (const key in config) {
    if (typeof config[key] === 'object' && mergeObj[key]) {
      mergeConfig(config[key], mergeObj[key])
    } else {
      config[key] = mergeObj[key] || config[key]
    }
  }
  return config
}

const config = mergeConfig(defaultConfig, envConfig)

module.exports = config
