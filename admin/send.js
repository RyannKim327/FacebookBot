const { getAdminGroup } = require("./../config")
const logs = require("./../utils/logs")

module.exports = async (api, event, regex) => {
  const body = event.body
  const id = body.match(regex)[1]
  const msg = body.match(regex)[2]
  
  if(event.threadID == getAdminGroup()){
    api.sendMessage(msg, id, (e, m) => {
      if(e){
        logs(`Error [Sending Message]: ${JSON.stringify(e)}`)
        api.sendMessage(`Error [Sending Message] ${JSON.stringify(e, null, 2)}`, getAdminGroup(), (e, m) => {})
      }else[
        api.sendMessage(`Success [Sending Message]: Sent`, getAdminGroup(), (e, m) => {})
      ]
    })
  }
}
