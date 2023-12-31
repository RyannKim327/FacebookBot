const YoutubeMusicApi = require("youtube-music-api")
const yt = new YoutubeMusicApi()
const http = require("https")
const fs = require("fs")
const ytdl = require("ytdl-core")
const ffmpeg = require("@ffmpeg-installer/ffmpeg")
const ffmpegs = require("fluent-ffmpeg")
ffmpegs.setFfmpegPath(ffmpeg.path)

module.exports = async (api, event) => {
	const playlist = "PLWzl3AM4OHkxyqK9-BEKefHMSRzwEs3Bf"
	let filename = `${__dirname}/../temp/${event.threadID}_${event.senderID}_videoke.mp4`
	const list = await yt.getPlaylist(playlist)
	console.log(list)
	const musics = list.content
	const music = musics[Math.floor(Math.random() * musics.length)]
	const url = `https://www.youtube.com/watch?v=${music.videoId}`
	if(!fs.existsSync(filename)){
		try{
			const file = `temp/${event.threadID}_${event.senderID}_videoke.mp4`
			const stream = ytdl(url, {
				quality: "lowest"
			})
			ffmpegs(stream).audioBitrate(48).save(filename).on("end", async () => {
				api.sendMessage({
					body: "Its your time to shine, kanta mo na to!",
					attachment: fs.createReadStream(filename).on("end", async () => {
						if(fs.existsSync(filename)){
							fs.unlinkSync(filename, (err) => {})
						}
					})
				}, event.threadID, (e, m) => {})
			})
		}catch(err) {
			api.sendMessage(`Error: ${err.message}`, event.threadID, (e, m) => {})
		}
	}
}
