const fs = require("fs")
const http = require("https")
const afk = require("./../utils/afk")
const g = require("./../utils/gender")
const react = require("./../utils/react")

module.exports = async (api, event, regex) => {
	let json = JSON.parse(fs.readFileSync("data/pin.json", "utf8"))
	let json2 = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	if(json[event.threadID] == undefined){
		api.sendMessage("There is no pinned message for this thread.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
			afk(api, json2)
		})
	}else{
		let p = json[event.threadID]
		let user = await api.getUserInfo(p.senderID)
		let gender = g(user[p.senderID]['firstName'])["eng"]
		let name = user[p.senderID]['name']
		if(p.attachments.length <= 0){
			api.sendMessage({
				body: `Pinned message sent by ${gender} ${name}\n\n${atob(p.body)}`,
				mentions: [{
					id: p.senderID,
					tag: name
				}]
			}, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
				afk(api, json2)
			})
		}else{
			let at = p.attachments
			for(let a = 0; a < at.length; a++){
				let f = fs.createWriteStream(at[a].name)
				http.get(at[a].url, (r) => {
					r.pipe(f)
					f.on("finish", () => {
						api.sendMessage({
							body: `Pinned message sent by ${gender} ${name}\n\n${atob(p.body)}`,
							attachment: fs.createReadStream(__dirname + "/../" + at[a].name).on("end", () => {
								if(fs.existsSync(__dirname + "/../" + at[a].name)){
									fs.unlink(__dirname + "/../" + at[a].name, (e) => {})
								}
							}),
							mentions: [{
								id: p.senderID,
								tag: name
							}]
						}, event.threadID, (e, m) => {
							if(e){
								api.setMessageReaction(react, event.messageID, (e) => {}, true)
							}
							afk(api, json2)
						})
					})
				})
			}
		}
	}
}