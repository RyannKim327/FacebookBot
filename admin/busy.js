const fs = require("fs")
const { getPrefix } = require("./../config")
const react = require("./../utils/react")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	if(event.body == (getPrefix() + "clearbusy") && json.busy){
		json.busylist = []
		api.sendMessage("Busy lists cleared.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
		})
	}else if(event.body == (getPrefix() + "busy")){
		json.busy = !json.busy
		
		if(json.busy){
			json.busylist = []
			api.sendMessage("Busy mode on.", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}else{
			json.busylist = []
			api.sendMessage("Busy mode off.", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}
