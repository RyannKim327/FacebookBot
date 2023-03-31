const fs = require("fs")
const { setName } = require("./../config")
const react = require("./../utils/react")

module.exports = (api, event, regex) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let _data = event.body.match(regex)[1].split("")
	let data = _data[0].toUpperCase()
	let self = api.getCurrentUserID()
	_data.shift()
	data += _data.join("")
	json.name = data
	api.sendMessage(`New bot name set as ${data}`, event.threadID, (e, m) => {
		if(e){
			api.setMessageReaction(react, event.messageID, (e) => {}, true)
		}
	})
	setName(data)
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}