const fs = require("fs")
const afk = require("./../utils/afk")
const { commands, getPrefix } = require("./../config")
const react = require("./../utils/react")

module.exports = (api, event) => {
	let message = ""
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	message += "Game Commands:\n"
	i = 1
	for(let r = 0; r < commands.length; r++) {
		let data = commands[r].data
		let show = true
		if(data.show != undefined)
			show = data.show
		if(!data.admin && show && data.category == "game"){
			message += i + ". " + data.title + "\n~ " + data.description + "\n"
			let j = 1
			data.commands.sort()
			data.commands.forEach(q => {
				j += 1
				message += j + ". " + getPrefix() + q.replace(/(\(\[\\w\\W\]\+\))/gi, "<data>").replace(/(\(\[\\w\]\+\))/gi, "<data>").replace(/(\\s)/gi, " ").replace(/(\$)/gi, "").replace(/(\(\[\\d\]\+\))/gi, "<data>") + "\n"
			})
			message += "\n"
			i += 1
		}
	}
	api.sendMessage(message, event.threadID, (e, m) => {
		if(e){
			api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
		}
		afk(api, json)
	})
}
