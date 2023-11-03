let { checkVip, addVip, removeVip } = require("./../config")

let checker = (id) => {
	return checkVip().includes(id)
}

module.exports = (api, event) => {
	console.log(checkVip())
	if(event.type == "message_reply"){
		if(checker(event.messageReply.senderID)){
			api.sendMessage("User is already a VIP member", event.threadID, (e, m) => {})
		}else{
			addVip(event.messageReply.senderID)
			api.sendMessage("User is a vip for about an hour", event.threadID, (e, m) => {})
			setTimeout(() => {
				removeVip(event.messageReply.senderID)
				api.sendMessage("Expired na yung 1 hr free trial.", event.threadID, (e, m) => {}, event.messageReply.messageID)
			}, ((1000 * 60) * 60))
		}
	}
}