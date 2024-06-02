const expr = require("./../utils/regex")

module.exports = (next) => {
  return async (api, event, regex) => {
    const hasArgument = /([\( | \[ | \] | \)]+)/gi.test(regex)
    const expressison = expr(regex)
    if((!hasArgument && event.body == regex) || (hasArgument && expressison.test(event.body))){
      return next(api, event, regex)
    }
    return
  }
}
