import {log} from 'common/Log'

const settings = {
  gaProperty: process.env.GA_PROPERTY,
  caasEndpoint: process.env.KARMA_ENDPOINT,
  user: process.env.KARMA_USER,
  pwd: process.env.KARMA_PWD,
  caasDb: process.env.KARMA_DATABASE,
  pageCacheExpirySeconds: process.env.PAGE_CACHE_EXPIRY_SECONDS || 0,
  mediaDomain: 'http://media.karma.run',
  reCaptchaSitekey: process.env.RECAPTCHA_SITEKEY,
}

module.exports = (() => {
  log("**************************************************************************************")
  log("caasEndpoint:", settings.caasEndpoint)
  log("caasDb:", settings.caasDb)
  log("user:", settings.user)
  return settings
})()