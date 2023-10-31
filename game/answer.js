const fs = require("fs")
const react = require("./../utils/react")

module.exports = (api, event, regex) => {
	let body = event.body.match(regex)[1]
	let json = JSON.parse(fs.readFileSync("data/games.json", "utf8"))
	if(json.answer[event.senderID] == undefined){
		api.sendMessage("Please play a game first.", event.threadID)
	}else{
		let data = json.answer[event.senderID]
		let score = json[json.current_game[event.senderID]]['score'][event.senderID]
		if(score == undefined){
			json[json.current_game[event.senderID]]['score'][event.senderID] = 0
		}
		if(data.includes(body)){
			json[json.current_game[event.senderID]]['score'][event.senderID]  += 1
			api.sendMessage("You've got it.", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}else{
			let score = json[json.current_game[event.senderID]]['score'][event.senderID]
			if(json.current_game[event.senderID] == "word"){
				if(json.word.trials[event.senderID] > 1){
					json.word.trials[event.senderID] -= 1
				}else{
					api.sendMessage(`Wrong answer, it must be ${json.answer[event.senderID]}.`, event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react, event.messageID, (e) => {}, true)
						}
					})
					if(json[json.current_game[event.senderID]]['score'][event.senderID]  > 0){
						json[json.current_game[event.senderID]]['score'][event.senderID]  -= 1
					}
				}
			}else{
				let ans = `Wrong answer, it must be ${json.answer[event.senderID]}.`
				if(json.current_game[event.senderID] == "bugtong"){
					ans = "The answer for this category is hidden."
				}
				api.sendMessage(ans, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
				})
				if(json[json.current_game[event.senderID]]['score'][event.senderID] > 0){
					json[json.current_game[event.senderID]]['score'][event.senderID] -= 1
				}
			}
		}
		api.sendMessage(`Your current score: ${json[json.current_game[event.senderID]]['score'][event.senderID]}`, event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
		}, event.messageID)
		json.answer[event.senderID] = undefined
		json.ingame[event.senderID] = undefined
		json.current_game[event.senderID] = undefined
		fs.writeFileSync("data/games.json", JSON.stringify(json), "utf8")
	}
}