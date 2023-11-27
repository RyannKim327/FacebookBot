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
	try{
		let thread = await api.getThreadInfo(event)
		const file = fs.createWriteStream(`temp/${event}_worship_remix.mp3`)
		await yt.initalize()
		let music = await yt.getPlaylist("PLyijK8r_zE5J1a5mrLxgxraLFRnNN5HDL")
		let _music = music.content[Math.floor(Math.random() * music.content.length)]
		const url = `https://www.youtube.com/watch?v=${_music.videoId}`
		const strm = ytdl(url, {
			quality: "lowestaudio"
		})
		const info = await ytdl.getInfo(url)
		ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event}_worship_remix.mp3`).on("end", async () => {
			if(thread.isGroup){
				api.sendMessage({
					body: `A random worship song (remix) for ${thread.threadName}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}\n\nNot all remixing worship songs are bad, as if you worshiping God and praising him.`,
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
				}, event, (e, m) => {
					if(e){
						afk(api, json2)
					}
				})
			}else{
				let user = await api.getUserInfo(event)
				const g = gender(user[event]['firstName'])['eng']
				let name = `${g} ${user[event]['name']}`
				api.sendMessage({
					body: `A random worship song (remix) for ${name}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}\n\nThank you for being a part of my 2023.`,
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
				}, event, (e, m) => {
					if(e){
						afk(api, json2)
					}
				})
			}
		})
	}catch(err){
		console.log(err)
	}
}