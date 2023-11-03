const fs = require("fs")
const YoutubeMusicApi = require('youtube-music-api')
const yt = new YoutubeMusicApi()
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg')
const ffmpegs = require('fluent-ffmpeg')
ffmpegs.setFfmpegPath(ffmpeg.path)

const afk = require("./../utils/afk")
const gender = require("./../utils/gender")
const react =  require("./../utils/react")
const font = require("./../utils/font")


module.exports = async (api, event) => {
	let name = `${__dirname}/../temp/${event}_worship.mp3`
	let json = JSON.parse(fs.readFileSync("data/songs.json", "utf8"))
	let json2 = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let songs = json.links
	let song = songs[Math.floor(Math.random() * songs.length)]
	if(!fs.existsSync(name)){
		let thread = await api.getThreadInfo(event)
		try{
			const file = fs.createWriteStream(`temp/${event}_worship.mp3`)
			const url = `https://www.youtube.com/watch?v=${song}`
			const strm = ytdl(url, {
				quality: "lowest"
			})
			const info = await ytdl.getInfo(url)
			ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event}_worship.mp3`).on("end", async () => {
				if(thread.isGroup){
					api.sendMessage({
						body: `Here's a random worship song sent to ${threadName}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}`,
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
					let name = `${gender(user[event]['firstName'])} ${user[event]['name']}`
					api.sendMessage({
						body: `Here's a random worship song sent to you ${name}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}`,
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