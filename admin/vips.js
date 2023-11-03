const { vips } = require("./../config")

let checker = (id) => {
	return vips.includes(id)
}

module.exports = (api, event) => {
	if(event.type == "message_reply"){
		if(checker(event.messageReply.senderID))
		vips += event.messageReply.senderID
	}
}