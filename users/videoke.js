const YoutubeMusicApi = require("youtube-music-api")
const yt = new YoutubeMusicApi()
const fs = require("fs")
const ytdl = require("ytdl-core")
const ffmpeg = require("@ffmpeg-installer/ffmpeg")
const ffmpegs = require("fluent-ffmpeg")
ffmpegs.setFfmpegPath(ffmpeg.path)

const afk = require("./../utils/afk")
const gender = require("./../utils/gender")

module.exports = async (api, event) => {
	const pl = [
		"PLWzl3AM4OHkxyqK9-BEKefHMSRzwEs3Bf",
		"PLHrvPPZnleL5nQZljS4dhfVz5sHWih2C6"
	]
	const playlist = pl[Math.floor(Math.random() * pl.length)]
	let name = `${__dirname}/../temp/${event.threadID}_${event.senderID}_videoke.mp4`
	let json2 = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	await yt.initalize()
	let music = await yt.getPlaylist(playlist)
	let _music = music.content[Math.floor(Math.random() * music.content.length)]
	const url = `https://www.youtube.com/watch?v=${_music.videoId}`
	if(!fs.existsSync(name)){
		api.setMessageReactionMqtt("⏳", event.messageID, (e) => {}, true)
		try{
			const file = fs.createWriteStream(`temp/${event.threadID}_${event.senderID}_videoke.mp4`)
			const strm = ytdl(url, {
				quality: "lowest"
			})
			const info = await ytdl.getInfo(url)
			ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event.threadID}_${event.senderID}_videoke.mp4`).on("end", async () => {
				let user = await api.getUserInfo(event.senderID)
				const g =	 gender(user[event.senderID]['firstName'])['eng']
				let name = `${g} ${user[event.senderID]['name']}`
				api.sendMessage({
					body: `Here's your song ${name}:\nTitle: ${info.videoDetails.title}\nGalingan mo sa pagkanta. ENJOY!!!`,
					attachment: fs.createReadStream(`${__dirname}/../temp/${event.threadID}_${event.senderID}_videoke.mp4`).on("end", async () => {
						if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}_videoke.mp4`)){
							fs.unlink(`${__dirname}/../temp/${event.threadID}_${event.senderID}_videoke.mp4`, (err) => {
								if(err){
									console.log(err)
								}
								api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
								console.log("Done")
							})
						}
					}),
					mentions: [{
						id: event.senderID,
						tag: name
					}]
				}, event.threadID, (e, m) => {
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
