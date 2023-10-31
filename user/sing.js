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
	if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`)){
		return api.sendMessage("Your request is still in progress, please wait for a moment", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
		}, event.messageID)
	}
	try{
		const json = JSON.parse(fs.readFileSync("data/preferences.json"))
		const file = fs.createWriteStream(`temp/${event.threadID}_${event.senderID}.mp3`)
		api.setMessageReaction("🔎", event.messageID, (e) => {}, true)
		const data = event.body.match(regex)[1]
		const yt_1 = /youtube.com\/watch\?v=([\w\S]+)/
		await yt.initalize()
		const music = await yt.search(data.replace(/[^\w\s]/gi, ''))
		if(music.content.length <= 0){
			throw new Error(`${data.replace(/[^\w\s]/gi, '')} returned no results found`)
		}else{
			if(music.content[0].videoId == undefined){
				throw new Error(`${data.replace(/[^\w\s]/gi, '')} is not found on youtube music. Try to add the singer, maybe I can find it.`)
			}
		}
		const url = `https://www.youtube.com/watch?v=${music.content[0].videoId}`
		const strm = ytdl(url, {
			quality: "lowest"
		})
		const info = await ytdl.getInfo(url)
		api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
		let user = await api.getUserInfo(event.senderID)
		let g = gender(user[event.senderID]['firstName'])['eng']
		let reqBy = `${g} ${user[event.senderID]['name']}`
		ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`).on("end", async () => {
			api.sendMessage({
				body: `Here's your requests ${reqBy}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}`,
				mentions:[{
					id: event.senderID,
					tag: user[event.senderID]['name']
				}],
				attachment: fs.createReadStream(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`).on("end", async () => {
					if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`)){
						fs.unlink(`${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`, (err) => {
							if(err){
								console.log(err)
							}
							api.setMessageReaction("", event.messageID, (e) => {}, true)
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
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		})
	}catch(err){
		console.log(err)
		api.sendMessage("Error: " + err, event.threadID, event.messageID)
		api.setMessageReaction("", event.messageID, (e) => {}, true)
	}
}