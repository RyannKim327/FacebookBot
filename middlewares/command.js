const expr = require("./../utils/regex")
module.exports = (next) => {
  return async = (api, event, regex) => {
    const hasArgument = /([\( | \[ | \] | \)]+)/gi.test(event.body)
    const expressison = expr(regex)
    if((!hasArgument && event.body == regex) && expr.test(event.body)){

    }
  }
}
