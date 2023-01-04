const fs = require("fs")

module.exports = (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	json.ai = !json.ai
	api.sendMessage(`AI Mode: ${json.ai}`, event.threadID, (e, m) => {
		if(e){
			api.setMessageReaction("✨", event.messageID, (e) => {}, true)
		}
	})
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}