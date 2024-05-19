const axios = require("axios")
const fs = require("fs")
const YoutubeMusicApi = require('youtube-music-api')
const yt = new YoutubeMusicApi()
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg')
const ffmpegs = require('fluent-ffmpeg')
ffmpegs.setFfmpegPath(ffmpeg.path)

const afk = require("../utils/afk")
const gender = require("../utils/gender")
const react =  require("../utils/react")
const font = require("../utils/font")

module.exports = async (api, event, regex) => {
	if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp4`)){
		return api.sendMessage("Your request is still in progress, please wait for a moment", event.threadID, (e, m) => {
			if(e){
				api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
			}
		}, event.messageID)
	}
	try{
		const json = JSON.parse(fs.readFileSync("data/preferences.json"))
		const file = fs.createWriteStream(`temp/${event.threadID}_${event.senderID}.mp4`)
		api.setMessageReactionMqtt("🔎", event.messageID, (e) => {}, true)
		const data = event.body.match(regex)[1]
		const yt_1 = /youtube.com\/watch\?v=([a-zA-Z0-9-_]{11}$)/
		const yt_2 = /youtu.be\/([a-zA-Z0-9-_]+)/
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
			music = await yt.search(data.replace(/[^\w\s]/gi, ''))
			if(music.content.length <= 0){
				throw new Error(`${data.replace(/[^\w\s]/gi, '')} returned no results found`)
			}else{
				if(music.content[0].videoId == undefined){
					throw new Error(`${data.replace(/[^\w\s]/gi, '')} is not found on youtube music. Try to add the singer, maybe I can find it.`)
				}
			}
		}
		const url = `https://www.youtube.com/watch?v=${music.content[0].videoId}`
		const strm = ytdl(url, {
			quality: "lowest"
		})
		const info = await ytdl.getInfo(url)
		api.setMessageReactionMqtt("⏳", event.messageID, (e) => {}, true)
		let user = await api.getUserInfo(event.senderID)
		let g = gender(user[event.senderID]['firstName'])['eng']
		let reqBy = `${g} ${user[event.senderID]['name']}`
		ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp4`).on("end", async () => {
			api.sendMessage({
				body: `Here's your requests ${reqBy}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}`,
				mentions:[{
					id: event.senderID,
					tag: user[event.senderID]['name']
				}],
				attachment: fs.createReadStream(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp4`).on("end", async () => {
					if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp4`)){
						fs.unlink(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp4`, (err) => {
							if(err){
								console.log(err)
							}
							api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
							console.log("Done")
						})
					}
				})
			}, event.threadID, (e, m) => {
				if(e){
					api.sendMessage(e.message, event.threadID, (e, m) => {
						afk(api, json)
					})
				}
			})
			api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
		})
	}catch(err){
		console.log(err)
		api.sendMessage("Error: " + err, event.threadID, event.messageID)
		api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
	}
}
