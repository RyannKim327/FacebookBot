const { vips } = require("./../config")
module.exports = (api, event) => {
	if()
	if(event.type == "message_reply"){
		vips += event.messageReply.senderID
	}
}