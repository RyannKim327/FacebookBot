const axios = require("axios")
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
	let songs = json.lists
	let song = songs[Math.floor(Math.random() * songs.length]
	if(!fs.existsSync(name)){
		try{
			const file = fs.createWriteStream(`temp/${event}_worship.mp3`)
			const data = song
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
			const thread = await api.getThreadInfo(event)
			ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event}_worship.mp3`).on("end", async () => {
				api.sendMessage({
					body: `Here's a random worship song sent to ${thread.threadName}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}`,
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
			})
		}catch(err){
			console.log(err)
		}
	}
}