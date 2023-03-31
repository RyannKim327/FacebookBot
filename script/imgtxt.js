const fs = require("fs")
const sc = require("pls-img-txt")
const request = require("request")
const afk = require("./../utils/afk")
const react = require("./../utils/react")

module.exports = async (api, event) => {
	sc.addLanguage(sc.FILIPINO)
	sc.addLanguage(sc.TAGALOG)
	let a = event.messageReply.attachments
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	if(a.length > 0){
		if(a[0].type != "photo")
			return api.sendMessage("I can't find any image here.", event.messageReply.threadID, (err, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
		let msg = event.messageID.replace(/\./gi, "")
		let file = fs.createWriteStream(`temp/${msg}.jpg`)
		let r = request(a[0].url)
		r.pipe(file)
		r.on("close", async () => {
			api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
			let s = await sc.scan(`./temp/${msg}.jpg`, 2, 3)
			let msg2 = "The text I get here in this image is:\n\n" + s.result
			if(s.result.length < 1)
				msg2 = "There's no text detected to this image."
			
			api.sendMessage(msg2, event.threadID, (e, m) => {
				if(fs.existsSync(`${__dirname}/../temp/${msg}.jpg`)){
					fs.unlink(`${__dirname}/../temp/${msg}.jpg`, (e) => {})
				}
				afk(api, json)
			}, event.messageReply.messageID)
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		})
	}else{
		api.sendMessage("I can't find any image here.", event.messageReply.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
			afk(api, json)
		})
	}
}