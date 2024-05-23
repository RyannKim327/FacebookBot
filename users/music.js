const axios = require("axios")
const fs = require("fs")
const YoutubeMusicApi = require('youtube-music-api')
const yt = new YoutubeMusicApi()
const ytdl = require('ytdl-core')
const afk = require("../utils/afk")
const gender = require("../utils/gender")
const react =  require("../utils/react")
const font = require("../utils/font")

module.exports = async (api, event, regex) => {
	const timestart = Date.now()
	if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`)){
		return api.sendMessage("Your request is still in progress, please wait for a moment", event.threadID, (e, m) => {
			if(e){
				api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
			}
		}, event.messageID)
	}
	api.sendMessage("Searching...", event.threadID, async (err, msg) => {
		let msgID = msg.messageID
		try{
			const json = JSON.parse(fs.readFileSync("data/preferences.json"))
			const file = fs.createWriteStream(`temp/${event.threadID}_${event.senderID}.mp3`)
			api.setMessageReactionMqtt("🔎", event.messageID, (e) => {}, true)
			const data = event.body.match(regex)[1]
			const yt_1 = /youtube.com\/watch\?v=([a-zA-Z0-9\-_]{11}$)/i
			const yt_2 = /youtu.be\/([a-zA-Z0-9\-_]{11})/i
			let music = {}
			if(yt_1.test(data)){
				music = {
					"content": [
						{
							"videoId": data.match(yt_1)[1]
						}
					]
				}
			}else if(yt_2.test(data)){
				music = {
					"content": [
						{
							"videoId": data.match(yt_2)[1].split("?")[0]
						}
					]
				}
			}else{
				await yt.initalize()
				music = await yt.search(data.replace(/[^\w\s]/gi, ''), "video")
				if(music.content.length <= 0){
					throw new Error(`${data.replace(/[^\w\s]/gi, '')} returned no results found`)
				}else{
					if(music.content[0].videoId == undefined){
						throw new Error(`${data.replace(/[^\w\s]/gi, '')} is not found on youtube music. Try to add the singer, maybe I can find it.`)
					}
				}
			}
			const url = `https://www.youtube.com/watch?v=${music.content[0].videoId}`		
			const info = await ytdl.getInfo(url)
			api.editMessage("Processing...", msgID, (err, m) => {})
			api.setMessageReactionMqtt("⏳", event.messageID, (e) => {}, true)
			let user = await api.getUserInfo(event.senderID)
			let g = gender(user[event.senderID]['firstName'])['eng']
			let reqBy = `${g} ${user[event.senderID]['name']}`
			ytdl(url, {
				quality: 'lowestaudio'
			}).pipe(file).on("finish", async () => {
				let lengthTime = parseInt(info.videoDetails.lengthSeconds)
				let min = Math.floor(lengthTime / 60)
				let sec = lengthTime % 60
				const time = `${min}:${sec}`
				const consume = new Date(Date.now() - timestart)
				const time_ = `${consume.getMinutes()}:${consume.getSeconds()}`
				api.sendMessage({
					attachment: fs.createReadStream(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`).on("end", async () => {
						if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`)){
							setTimeout(() => {
								fs.unlink(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`, (err) => {
									if(err){
										api.editMessage(`${err.message}`, msgID, (e, m) => {})
										console.log(err)
									}else{
										api.editMessage(`Here's your requests ${reqBy}:\nTitle: ${info.videoDetails.title}\nUploaded by: ${info.videoDetails.author.name}\nDuration: ${time}\n${info.videoDetails.video_url}\nTime Process: ${time_}`, msgID, (e, m) => {})
									}
									api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
									console.log("Done")
								})
							}, 500)
						}
					})
				}, event.threadID, (e, m) => {
					if(e){
						api.sendMessage(e.message, event.threadID, (e, m) => {
							api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
							afk(api, json)
						})
					}
				}, msgID)
				api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
			})
		}catch(err){
			console.log(err)
			api.editMessage("Error: " + err, msgID, (e, m) => {})
			if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`)){
				fs.unlinkSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}`, (e) => {})
			}
			api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
		}
	})
}
