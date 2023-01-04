const fs = require("fs")
const sc = require("pls-img-txt")
const request = require("request")

module.exports = async (api, event) => {
	sc.addLanguage(sc.CEBUANO)
	sc.addLanguage(sc.FILIPINO)
	sc.addLanguage(sc.TAGALOG)
	sc.addLanguage(sc.KOREAN)
	sc.addLanguage(sc.JAPANESE)
	let a = event.messageReply.attachments
	if(a.length > 0){
		if(a[0].type != "photo")
			return api.sendMessage("I can't find any image here.", event.messageReply.threadID)
		let msg = event.messageID.replace(/\./gi, "")
		let file = fs.createWriteStream(`temp/${msg}.jpg`)
		let r = request(a[0].url)
		r.pipe(file)
		r.on("close", async () => {
			api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
			let s = await sc.scan(`./temp/${msg}.jpg`)
			let msg2 = "The text I get here in this image is:\n\n" + s.result
			if(s.result.length < 1)
				msg2 = "There's no text detected to this image."
			
			api.sendMessage(msg2, event.threadID, (e, m) => {
				if(fs.existsSync(`${__dirname}/../temp/${msg}.jpg`)){
					fs.unlink(`${__dirname}/../temp/${msg}.jpg`, (e) => {})
				}
			}, event.messageReply.messageID)
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		})
	}else{
		api.sendMessage("I can't find any image here.", event.messageReply.threadID, (e, m) => {
			if(e){
				api.setMessageReaction("✨", event.messageID, (e) => {}, true)
			}
		})
	}
}