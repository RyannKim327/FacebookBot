const { getAdminGroup } = require("./../config")
const mydate = require("./../utils/date")

module.exports = (api, event) => {
	if(getAdminGroup() == event.threadID){
		api.sendMessage(`Last checked is ${mydate("Asia/Manila")}`, event.threadID, (err, msg) => {
			if(err) return console.error(`Error [Check]: ${JSON.stringify(err, null, 2)}`)
		})
	}else{
		if(getAdminGroup() != ""){
			api.sendMessage(`Last checked ${mydate("Asia/Manila")}`, getAdminGroup(), (err, msg) => {})
		}
		api.setMessageReaction("👍", event.messageID, (e) => {}, true)
		setTimeout((e) => {
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}, 15000)
	}
}
