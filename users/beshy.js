const afk = require("./../utils/afk")
const react = require("./../utils/react")
module.exports = (api, event, regex) => {
	const body = event.body.match(regex)[1]
	const besh = body.trim().replace(/\s+/g, "🤸‍♂️")
	api.sendMessage(besh, event.threadID,(e, m) => {
		if(e){
			api.setMessageReaction(react, event.messageID, (e) => {}, true)
		}
		afk(api, json)
	})
}