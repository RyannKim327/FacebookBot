const { download, search, getVideoInfo } = require("youtube-s-dl")
const fs = require("fs")
const http = require("https")

const afk = require("./../utils/afk")
const react = require("./../utils/react")
const gender = require("./../utils/gender")

module.exports = async (api, event, regex) => {
	let name = `${__dirname}/../temp/${event.threadID}.mp4`
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	if(fs.existsSync(name)){
		api.sendMessage("Lemme finish the earlier request please.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
			afk(api, json)
		})
	}else{
		api.setMessageReaction("🔎", event.messageID, (e) => {}, true)
		let body = event.body.match(regex)[1]
		let result = await search(body)
		let vid = result[0]
		try{
			let stream = await download(vid.videoId)
			let file = fs.createWriteStream(`temp/${event.threadID}.mp4`)
			let user = await api.getUserInfo(event.senderID)
			let g = gender(user[event.senderID]['firstName'])['eng']
			let reqBy = `${g} ${user[event.senderID]['name']}`
			if(stream == null){
				api.sendMessage(`There's an error on the server`, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
				if(fs.existsSync(name)){
					fs.unlink(name, (e) => {})
				}
			}else{
				http.get(stream, r => {
					r.pipe(file).on("finish", () => {
						api.sendMessage({
							body: `Here's your requests ${reqBy}\nTitle: ${vid.title}\nUploaded by: ${vid.uploaderName}`,
							attachment: fs.createReadStream(name).on("end", () => {
								if(fs.existsSync(name)){
									fs.unlink(name, (e) => {})
								}
							}),
							mentions: [{
								id: event.senderID,
								tag: reqBy
							}]
						}, event.threadID, (e, m) => {
							if(e){
								api.sendMessage(e, event.threadID, (e, m) => {
									if(e){
										api.setMessageReaction(react, event.messageID, (e) => {}, true)
									}
									afk(api, json)
								})
							}
							afk(api, json)
						})
					})
				})
			}
		}catch(e){
			console.error(e)
			api.sendMessage("Something went wrong", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
			if(fs.existsSync(name)){
				fs.unlink(name, (e) => {})
			}
		}
	}
}
