const yt = require("youtubei.js")
const fs = require("fs")
const react = require("./../utils/react")
const gender = require("./../utils/gender")

module.exports = async (api, event, regex) => {
	let name = `${__dirname}/../temp/${event.threadID}.mp3`
	if(fs.existsSync(name)){
		api.sendMessage("Lemme finish the earlier request please.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
		})
	}else{
		api.setMessageReaction("🔎", event.messageID, (e) => {}, true)
		const youtube = await new yt()
		let body = event.body.match(regex)[1]
		let id = ""
		let result = await youtube.search(body)
		if(result.videos.length > 0){
			if(result.videos[0].id == undefined){
				api,sendMessage("Something went wrong.", event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
				})
			}else{
				if(/https:\/\/www\.youtube\.com\/watch\?v=([\w\-_]+)/i.test(body) || /https:\/\/youtu\.be\/\?v=([\w\-_]+)/i.test(body)){
					console.log("RySes")
					if(body.match(/https:\/\/www\.youtube\.com\/watch\?v=([\w\-_]+)/i)[1] != undefined){
						id = body.match(/https:\/\/www\.youtube\.com\/watch\?v=([\w\-_]+)/i)[1]
						console.log("ID")
					}else if(body.match(/https:\/\/youtu\.be\/\?v=([\w\-_]+)/i)[1] != undefined){
						id = body.match(/https:\/\/youtu\.be\/\?v=([\w\-_]+)/i)[1]
						console.log("ID")
					}else{
						id = result.videos[0].id
					console.log(`Data: ${result}`)
					}
				}else{
					id = result.videos[0].id
					console.log(result)
				}
				console.log(id)
				const info = await youtube.getDetails(id)
				if(info.title == undefined){
					api.sendMessage("An Error Occured", event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react, event.messageID, (e) => {}, true)
						}
					})
				}
				let file = fs.createWriteStream(`temp/${event.threadID}.mp3`)
				let message = ""
				let f = youtube.download(id, {
					format: "mp4",
					quality: "tiny",
					type: "audio",
					audioQuality: "lowest",
					audioBitrate: "550"
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
					message += `Here's your request ${g} ${username}. A song entitled ${info.title}, uploaded by ${info.metadata.channel_name} on a platform called youtube.`
					try{
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
						}, event.threadID, (e, msg) => {
							if(e){
								api.sendMessage(`Error: ${e.errorSummary}`, event.threadID, (e, m) => {
									if(e){
										api.setMessageReaction(react, event.messageID, (e) => {}, true)
									}
								})
							}
						})
					}catch(e){
						api.sendMessage(e, event.threadID, (e, m) => {
							if(e){
								api.setMessageReaction(react, event.messageID, (e) => {}, true)
							}
						})
					}
				})
			}
		}else{
			api.sendMessage("There is no results found.", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}
	}
}
