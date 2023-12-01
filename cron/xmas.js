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
	let name = `${__dirname}/../temp/${event}_pasko.mp3`
	let json2 = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	await yt.initalize()
	let music = await yt.getPlaylist("PL6MWD1eg4jVsCyEBjOrFJu3yC2-n4Vi9A")
	let _music = music.content[Math.floor(Math.random() * music.content.length)]
	const url = `https://www.youtube.com/watch?v=${_music.videoId}`
	if(!fs.existsSync(name)){
		try{
			let thread = await api.getThreadInfo(event)
			const file = fs.createWriteStream(`temp/${event}_pasko.mp3`)
			const strm = ytdl(url, {
				quality: "lowestaudio"
			})
			const info = await ytdl.getInfo(url)
			ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event}_pasko.mp3`).on("end", async () => {
				if(thread.isGroup){
					api.sendMessage({
						body: `Nangangaroling po sa inyo ${thread.threadName}, here's a simple greetings for all of you:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}`,
						attachment: fs.createReadStream(`${__dirname}/../temp/${event}_pasko.mp3`).on("end", async () => {
							if(fs.existsSync(`${__dirname}/../temp/${event}_pasko.mp3`)){
								fs.unlink(`${__dirname}/../temp/${event}_pasko.mp3`, (err) => {
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
						body: `Nangangaroling po ${name}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}`,
						attachment: fs.createReadStream(`${__dirname}/../temp/${event}_pasko.mp3`).on("end", async () => {
							if(fs.existsSync(`${__dirname}/../temp/${event}_pasko.mp3`)){
								fs.unlink(`${__dirname}/../temp/${event}_pasko.mp3`, (err) => {
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