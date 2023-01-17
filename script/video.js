const yt = require("youtubei.js")
const fs = require("fs")
const react = require("./../utils/react")

const gender = require("./../utils/gender")

module.exports = async (api, event, regex) => {
	let name = `${__dirname}/../temp/${event.threadID}.mp4`
	if(fs.existsSync(name)){
		api.sendMessage("Lemme finish the earlier request please.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react(), event.messageID, (e) => {}, true)
			}
		})
	}else{
		api.setMessageReaction("🔎", event.messageID, (e) => {}, true)
		const youtube = await new yt()
		let body = event.body.match(regex)[1]
		let result = await youtube.search(body)
		if(result.videos.length > 0){
			if(result.videos[0].id == undefined){
				api,sendMessage("Something went wrong.", event.threadID, (e, m) => {})
			}else{
				const info = await youtube.getDetails(result.videos[0].id)
				if(info.title == undefined){
					api.sendMessage("An Error Occured", event.threadID, (e, m) => {})
				}
				let file = fs.createWriteStream(`temp/${event.threadID}.mp4`)
				let message = ""
				let f = youtube.download(result.videos[0].id, {
					format: "mp4",
					quality: "480p",
					type: "videoandaudio",
					bitrate: "2500",
					audioQuality: "highest",
					loudnessDB: "20",
					audioBitrate: "550",
					fps: "30"
				})
				f.pipe(file)
				f.on("start", () => {
					api.setMessageReaction("⌛", event.messageID, (e) => {}, true)
				})
				f.on("proccess", (info) => {
					api.setMessageReaction("⏳", event.messageID, (err) => {}, true)
				})
				f.on("end", async () => {
					let user = await api.getUserInfo(event.senderID)
					let username = user[event.senderID]['name']
					let firstName = user[event.senderID]['firstName']
					let g = gender(firstName)['eng']
					message += `Here's your request ${g} ${username}. A video entitled ${info.title}, uploaded by ${info.metadata.channel_name} on a platform called youtube.`
					api.sendMessage({
						body: message,
						attachment: fs.createReadStream(name).on("end", async () => {
							if(fs.existsSync(name)){
								fs.unlink(name, (e) => {
									if(e) return console.error(`Error [Youtube Music]: ${e}`)
									api.setMessageReaction("", event.messageID, (e) => {}, true)
								})
							}
						}),
						mentions: [{
							id: event.senderID,
							tag: username
						}]
					}, event.threadID, (e, m) => {
						if(e) return api.sendMessage(e, event.threadID, (e, m) => {
							if(e){
								api.setMessageReaction(react(), event.messageID, (e) => {}, true)
							}
						})
					})
				})
			}
		}else{
			api.sendMessage("There is no results found.", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react(), event.messageID, (e) => {}, true)
				}
			})
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}
	}
}
