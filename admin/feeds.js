const fs = require("fs")
const react = require("./../utils/react")

module.exports = (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/feedback.json", "utf8"))
	for(let i = 0; i < json.data.length; i++){
		if(json.data[i].toRead){
			let msg = json.data[i].msg.replace(/\./gi, ". ")
			api.sendMessage(msg, event.threadID, (e, m) => {
				if(e){
					api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
				}
			})
			json.data[i].toRead = false
		}
	}
	let arr = json.data
	for(let i = 0; i < arr.length; i++){
		if(!arr[i].toRead){
			arr.splice(i, 1)
		}
	}
	json.data = arr
	fs.writeFileSync("data/feedback.json", JSON.stringify(json), "utf8")
}
