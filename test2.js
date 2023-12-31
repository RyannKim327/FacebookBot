const fs = require("fs")
const YoutubeMusicApi = require('youtube-music-api')
const yt = new YoutubeMusicApi()
const ytdl = require('ytdl-core');
const ffmpeg = require('@ffmpeg-installer/ffmpeg')
const ffmpegs = require('fluent-ffmpeg')
ffmpegs.setFfmpegPath(ffmpeg.path)


let run = async () => {
	let name = `${__dirname}/../temp/${event.threadID}_${event.senderID}_yamete.mp3`
	let json2 = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	await yt.initalize()
	let music = await yt.getPlaylist("PL8lZieNFgOdmrNGTqwjqYJpJ_2nw_O_M2")
	let _music = music.content[Math.floor(Math.random() * music.content.length)]
	const url = `https://www.youtube.com/watch?v=${_music.videoId}`
	if(!fs.existsSync(name)){
		try{
			const file = fs.createWriteStream(`temp/${event.threadID}_${event.senderID}_yamete.mp3`)
			const strm = ytdl(url, {
				quality: "lowestaudio"
			})
			const info = await ytdl.getInfo(url)
			ffmpegs(strm).audioBitrate(96).save(`${__dirname}/../temp/${event.threadID}_${event.senderID}_yamete.mp3`).on("end", async () => {
				let user = await api.getUserInfo(event.senderID)
				const g =	 gender(user[event.senderID]['firstName'])['eng']
				let name = `${g} ${user[event.senderID]['name']}`
				api.sendMessage({
					body: `Here's your request ${name}:\nTitle: ${font(info.videoDetails.title)}\nUploaded by: ${info.videoDetails.author.name}`,
					attachment: fs.createReadStream(`${__dirname}/../temp/${event.threadID}_${event.senderID}_yamete.mp3`).on("end", async () => {
						if(fs.existsSync(`${__dirname}/../temp/${event.threadID}_${event.senderID}_yamete.mp3`)){
							fs.unlink(`${__dirname}/../temp/${event.threadID}_${event.senderID}_yamete.mp3`, (err) => {
								if(err){
									console.log(err)
								}
								console.log("Done")
							})
						}
					})
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
run()