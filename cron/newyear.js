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
	let name = `${__dirname}/../temp/${event}_newyear.mp3`
	let json2 = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let songs = [
		"UDRo5ExFZ8U",
		"IXVVA7ILn7c"
	]
	let song = songs[Math.floor(Math.random() * songs.length)]
	if(!fs.existsSync(name)){
		try{
			let thread = await api.getThreadInfo(event)
			const file = fs.createWriteStream(`temp/${event}_worship.mp3`)
			const url = `https://www.youtube.com/watch?v=${song}`
			const strm = ytdl(url, {
				quality: "lowestaudio"
			})
			const info = await ytdl.getInfo(url)
			ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event}_worship.mp3`).on("end", async () => {
				if(thread.isGroup){
					api.sendMessage({
						body: `Happy new year ${thread.threadName}, here's a simple greetings for all of you:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}\n\nThank you for being part of my 2023`,
						attachment: fs.createReadStream(`${__dirname}/../temp/${event}_worship.mp3`).on("end", async () => {
							if(fs.existsSync(`${__dirname}/../temp/${event}_worship.mp3`)){
								fs.unlink(`${__dirname}/../temp/${event}_worship.mp3`, (err) => {
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
					const g =	 gender(user[event]['firstName'])['eng']
					let name = `${g} ${user[event]['name']}`
					api.sendMessage({
						body: `Happy New Year to you ${name}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}\n\nThank you for being a part of my 2023.`,
						attachment: fs.createReadStream(`${__dirname}/../temp/${event}_worship.mp3`).on("end", async () => {
							if(fs.existsSync(`${__dirname}/../temp/${event}_worship.mp3`)){
								fs.unlink(`${__dirname}/../temp/${event}_worship.mp3`, (err) => {
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
}