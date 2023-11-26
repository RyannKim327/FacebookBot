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

module.exports = async (api, event) => {
	if(fs.existsSync(`${__dirname}/../temp/${event}_worship_remix.mp3`)){
		return api.sendMessage("Your request is still in progress, please wait for a moment", event, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
		}, event.messageID)
	}
	try{
		const json = JSON.parse(fs.readFileSync("data/preferences.json"))
		const file = fs.createWriteStream(`temp/${event}_worship_remix.mp3`)
		await yt.initalize()
		let music = await yt.getPlaylist("PLyijK8r_zE5J1a5mrLxgxraLFRnNN5HDL").content
		console.log(music)
		let _music = music[Math.floor(Math.random() * music.length)]
		const url = `https://www.youtube.com/watch?v=${_music.videoId}`
		const strm = ytdl(url, {
			quality: "lowest"
		})
		const info = await ytdl.getInfo(url)
		let user = await api.getUserInfo(event)
		let g = gender(user[event]['firstName'])['eng']
		let reqBy = `${g} ${user[event]['name']}`
		ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event}_worship_remix.mp3`).on("end", async () => {
			let lengthTime = parseInt(info.videoDetails.lengthSeconds)
			let min = Math.floor(lengthTime / 60)
			let sec = lengthTime % 60
			const time = `${min}:${sec}`
			api.sendMessage({
				body: `Here's your requests ${reqBy}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}\nDuration: ${time}\n${info.videoDetails.video_url}`,
				mentions:[{
					id: event.senderID,
					tag: user[event]['name']
				}],
				attachment: fs.createReadStream(`${__dirname}/../temp/${event}_worship_remix.mp3`).on("end", async () => {
					if(fs.existsSync(`${__dirname}/../temp/${event}_worship_remix.mp3`)){
						fs.unlink(`${__dirname}/../temp/${event}_worship_remix.mp3`, (err) => {
							if(err){
								console.log(err)
							}
							console.log("Done")
						})
					}
				})
			}, event.threadID, (e, m) => {
				if(e){
					api.sendMessage(e.message, event, (e, m) => {
						afk(api, json)
					})
				}
			})
		})
	}catch(err){
		console.log(err)
		api.sendMessage("Error: " + err, event)
	}
}