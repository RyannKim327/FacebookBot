const fs = require("fs")
const react = require("./../utils/react")

module.exports = async (api, event, regex) => {
	let json = JSON.parse(fs.readFileSync("data/gender.json", "utf8"))
	let data = event.body.match(regex)
	let name = data[1].toLowerCase()
	if(event.type == "message_reply"){
		let user = await api.getUserInfo(event.messageReply.senderID)
		let username = user[event.messageReply.senderID]['firstName']
		name = username.toLowerCase()
	}
	let g = data[2].toLowerCase()
	if((g.startsWith("m") || g.startsWith("l")) && !json.male.includes(name)){
		json.male += `${name}, `
	}else if((g.startsWith("f") || g.startsWith("b")) && !json.female.includes(name)){
		json.female += `${name}, `
	}else if(!(g.startsWith("m") || g.startsWith("l")) && (!(g.startsWith("f") || g.startsWith("b")))){
		if(!json.male.includes(name))
			json.male += `${name}, `
		if(!json.female.includes(name))
			json.female += `${name}, `
	}
	fs.writeFileSync("data/gender.json", JSON.stringify(json), "utf8")
	api.sendMessage("New name registered.", event.threadID, (e, m) => {
		if(e){
			api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
		}
	})
}
