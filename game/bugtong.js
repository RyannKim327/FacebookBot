const axios = require("axios")
const fs = require("fs")
const { getPrefix } = require("./../config")
const react = require("./../utils/react")

let getBugtong = async () => {
	let { data } = await axios.get("https://api-pinoy-bugtong.vercel.app")
	return data
}

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/games.json", "utf8"))
	if(json.ingame[event.senderID] != undefined){
		api.sendMessage(`You're still in game. Please answer this:\n${json.ingame[event.senderID]}\n\nTo answer, kindly message ${ getPrefix() }answer [your answer here]`, event.threadID, (e, m) => {
			if(e){
				api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
			}
		}, event.messageID)
	}else{
		let b = await getBugtong()
		json.ingame[event.senderID] = b.b
		json.answer[event.senderID] = b.s
		json.current_game[event.senderID] = "bugtong"
		api.sendMessage(`Here's your bugtong:\n~ ${b.b}\n\nTo answer, kindly message ${ getPrefix() }answer [your answer here]`, event.threadID, (e, m) => {
			if(e){
				api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
			}
		})
		fs.writeFileSync("data/games.json", JSON.stringify(json), "utf8")
	}
}
