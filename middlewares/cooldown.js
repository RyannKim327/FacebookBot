

module.exports = (next) => {
  return async function(api, event, regex) {
    // TODO: This program is to determine of the user is still in cooldown or not.
    // NOTE: This is to prevent the spam of the bot for a thread as well as to avoid and prevent abuse of use.
    if(true){
      return await next(api, event, regex)
    }
  }
}
