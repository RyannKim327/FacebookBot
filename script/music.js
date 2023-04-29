const { Innertube, Utils, UniversalCache } = require("youtubei.js")
const fs = require("fs")
const react = require("./../utils/react")
const gender = require("./../utils/gender")

module.exports = async (api, event, regex) => {
	let name = `${__dirname}/../temp/${event.threadID}.mp3`
	let body = event.body
	if(fs.existsSync(name)){
		api.sendMessage("Lemme finish the earlier request please.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
		})
	}else{
		api.setMessageReaction("🔎", event.messageID, (e) => {}, true)
		const youtube = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true })
		const searches = await youtube.search(event.body.match(regex)[1])
		try{
			let id = ""
			if(/https:\/\/www\.youtube\.com\/watch\?v=([\w\-_]+)/i.test(body) || /https:\/\/youtu\.be\/\?v=([\w\-_]+)/i.test(body)){
				if(body.match(/https:\/\/www\.youtube\.com\/watch\?v=([\w\-_]+)/i)[1] != undefined){
					id = body.match(/https:\/\/www\.youtube\.com\/watch\?v=([\w\-_]+)/i)[1]
				}else if(body.match(/https:\/\/youtu\.be\/\?v=([\w\-_]+)/i)[1] != undefined){
					id = body.match(/https:\/\/youtu\.be\/\?v=([\w\-_]+)/i)[1]
				}else{
					if(searches.results.length > 0){
						id = searches.results[0].id
					}
				}
			}else{
				if(searches.results.length > 0){
					id = searches.results[0].id
				}
			}
			if(id === ""){
				api.sendMessage("An error occured", event.threadID, (e, m) => {
					api.setMessageReaction(react, event.messageID, () => {}, true)
				})
			}else{
				const info = await youtube.getInfo(searches.results[0].id)
				if(info.basic_info.title === undefined){
					api.sendMessage("An error occured", event.threadID, (e, m) => {
						api.setMessageReaction(react, event.messageID, () => {}, true)
					})
				}else{
					const file = fs.createWriteStream(`temp/${event.threadID}.mp3`)
					let message = ""
					const stream = await youtube.download(info.basic_info.id, {
						type: 'audio',
						quality: 'best',
						format: 'mp4'
					})
					for await (const chuck of Utils.streamToIterable(stream)){
						file.write(chuck)
					}
					let user = await api.getUserInfo(event.senderID)
					let username = user[event.senderID]['name']
					let firstName = user[event.senderID]['firstName']
					let g = gender(firstName)['eng']
					message += `Here's your request ${g} ${username}. A song entitled ${info.basic_info.title}, uploaded by ${info.basic_info.author} on a platform called youtube.`
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
				}
			}
		}catch(e){
			console.log(e)
			api.sendMessage("An error occured", event.threadID, (e, m) => {
				api.setMessageReaction(react, event.messageID, () => {}, true)
			})
		}
	}
}