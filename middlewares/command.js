const expr = require("./../utils/regex")
const cooldown = require("./cooldown")
module.exports = (next) => {
  return async (api, event, regex) => {
    // TODO: This middleware handles the validation of the command requested by the user.
    // NOTE: This may help for the program to skip the command if it is not matched with the expression
    const hasArgument = /([\( | \[ | \] | \)]+)/gi.test(regex)
    const expressison = expr(regex)
    if((!hasArgument && event.body == regex) || (hasArgument && expressison.test(event.body))){
      const cd = cooldown(next)
      return cd(api, event, regex)
    }
    return
  }
}
