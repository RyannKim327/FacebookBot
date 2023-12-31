const youtube = require("youtube-music-api")
const http = require("https")
const fs = require("fs")
const ytdl = requrie("ytdl-core")
const ffmpeg = require("@ffmpeg-installer/ffmpeg")
const ffmpegs = require("fluent-ffmpeg")
ffmpegs.setFfmpegPath(ffmpeg.path)

module.exports = async (api, event) => {
	const playlist = "PLWzl3AM4OHkxyqK9-BEKefHMSRzwEs3Bf"
	let filename = `${__dirname}/../temp/${event.threadID}_${event.senderID}_videoke.mp4`
	const yt = new youtube()
	const list = await yt.getPlaylist(playlist)
	const musics = list.content
	const music = musics[Math.floor(Math.random() * musics.length]
	const url = `https://www.youtube.com/watch?v=${music.videoId}`
	if(!fs.existsSync(filename)){
		try{
			const file = `temp/${event.threadID}_${event.senderID}_videoke.mp4`
			const stream = ytdl(url, {
				quality: "lowest"
			})
			const info = await ytdl.getInfo(url)
			ffmpegs(stream).audioBitrate(96).save(filename)
			api.sendMessage({
				body: "Its your time to shine, kanta mo na to!",
				attachment: fs.createReadStream(filename).on("end", async () => {
					if(fs.existsSync(filename)){
						fs.unlinkSync(filename, (err) => {})
					}
				})
			}, event.threadID, (e, m) => {})
		}catch(err) {
			api.sendMessage(`Error: ${err.message}`, event.threadID, (e, m) => {})
		}
	}
}
