const config = require("./../config")

module.exports = (api, event) => {
	const self = api.getCurrentUserID()
	if(event.messageReply.senderID == self){
		api.unsendMessage(event.messageReply.messageID, (e) => {
			if(e) return console.log(`Error[unsent]: $e}`)
		})
		if(event.senderID == self){
			api.unsendMessage(event.messageID, (e) => {
				if(e) return console.log(`Error[unsent]: $e}`)
			})
		}
	}
}