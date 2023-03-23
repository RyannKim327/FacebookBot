const fs = require("fs")
const react = require("./../utils/react")

module.exports = (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/songs.json", "utf8"))
	json.lists.sort()
	let data = "Lists:\n\n"
	json.lists.forEach(r => {
		data += "* " + r + "\n"
	})
	api.sendMessage(data, event.threadID, (e, m) => {
		if(e){
			api.setMessageReaction(react, event.messageID, (e) => {}, true)
		}
	})
}