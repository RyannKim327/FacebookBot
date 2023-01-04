const fs = require("fs")
const { getPrefix, setPrefix } = require("./../config")
module.exports = (api, event, regex) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let _data = event.body.match(regex)[1]
	let data = _data[0]
	json.prefix = data
	api.sendMessage(`Bot prefix changed from ${getPrefix()} to ${data}`, event.threadID, (e, m) => {
		if(e){
			api.setMessageReaction("✨", event.messageID, (e) => {}, true)
		}
	})
	setPrefix(data)
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}