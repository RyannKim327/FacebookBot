let { vips } = require("./../config")

let checker = (id) => {
	return vips.includes(id)
}

module.exports = (api, event) => {
	if(event.type == "message_reply"){
		if(checker(event.messageReply.senderID)){
			api.sendMessage("User is already a VIP member", event.threadID, (e, m) => {})
		}else{
			vips += event.messageReply.senderID
			api.sendMessage("User is a vip for about an hour", event.threadID, (e, m) => {})
			setTimeout(() => {
				vips.replace(event.messageReply.senderID, "")
			}, ((1000 * 60) * 60))
		}
	}
}