const axios = require("axios")
const fs = require("fs")
const YoutubeMusicApi = require('youtube-music-api')
const yt = new YoutubeMusicApi()
const ytdl = require('ytdl-core')
const afk = require("./../utils/afk")
const gender = require(".././utils/gender")
const react =  require("./../utils/react")
const font = require("./../utils/font")
const logs = require("./../utils/logs")

module.exports = async (api, event, regex) => {
	const timestart = Date.now() / 1000
	const filename = `${__dirname}/../temp/${event.threadID}_${event.senderID}.mp3`
	if(fs.existsSync(filename)){
		return api.sendMessage("Ang iyong kahilinga'y malabo pang ibigay, subukan mo bukas, baka pwede na.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
			}
		}, event.messageID)
	}
	api.sendMessage("Wait lang, hahanapan lang kita ng ibabagay sa iyo.", event.threadID, async (err, msg) => {
		let msgID = msg.messageID
		try{
			const json = JSON.parse(fs.readFileSync("data/preferences.json"))
			const file = fs.createWriteStream(`temp/${event.threadID}_${event.senderID}.mp3`)
			api.setMessageReactionMqtt("🔎", event.messageID, (e) => {}, true)
			const data = event.body.match(regex)[1]
			const yt_1 = /youtube.com\/watch\?v=([a-zA-Z0-9\-_]{11})/i
			const yt_2 = /youtu.be\/([a-zA-Z0-9\-_]{11})/i
			let music = {}
			if(yt_1.test(data)){
				music = {
					"content": [
						{
							"videoId": data.match(yt_1)[1].split("&")[0]
						}
					]
				}
			}else if(yt_2.test(data)){
				music = {
					"content": [
						{
							"videoId": data.match(yt_2)[1].split("?")[0]
						}
					]
				}
			}else{
				await yt.initalize()
				music = await yt.search(data.replace(/[^\w\s]/gi, ''), "video")
				if(music.content.length <= 0){
					throw new Error(`${data.replace(/[^\w\s]/gi, '')} hindi ko makita gar, pakiayos naman kung sino ba ung kumanta, para mas specific ba.`)
				}else{
					if(music.content[0].videoId == undefined){
						throw new Error(`${data.replace(/[^\w\s]/gi, '')} hindi ko makita gar, pakidagdagan nga kung sino ang kumanta, malay mo makita ko na ung para sa'yo.`)
					}
				}
			}
			const url = `https://www.youtube.com/watch?v=${music.content[0].videoId}`		
			const info = await ytdl.getInfo(url)
			api.editMessage("Ayan, pasko na, hindi pa tapos, ayos lang yan, ikaw nga kinausap, tapos ngayon may iba nang nahanap.", msgID, (err, m) => {})
			api.setMessageReactionMqtt("⏳", event.messageID, (e) => {}, true)
			let user = await api.getUserInfo(event.senderID)
			let g = gender(user[event.senderID]['firstName'])['tag']
			let reqBy = `${g} ${user[event.senderID]['name']}`
			ytdl(url, {
				quality: 'lowestaudio'
			}).pipe(file).on("finish", async () => {
				let lengthTime = parseInt(info.videoDetails.lengthSeconds)
				let min = Math.floor(lengthTime / 60)
				let sec = lengthTime % 60
				let time = `${min <  10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`
				const consume = ((Date.now() / 1000) - timestart)
				const time_ = consume.toFixed(2)
				const filesize = fs.statSync(filename).size
				const mb = (filesize / 1024) / 1024
				api.sendMessage({
					attachment: fs.createReadStream(filename).on("end", async () => {
						if(fs.existsSync(filename)){
							setTimeout(() => {
								fs.unlink(filename, (err) => {
									if(err){
										api.editMessage(`${err.message}`, msgID, (e, m) => {})
										console.log(err)
									}else{
										api.editMessage(`${reqBy} ito na ang iyong pinakahihitay, masiyahan kang nawa sa simpleng handog ko:\nPamagat: ${info.videoDetails.title}\nTagapamahagi: ${info.videoDetails.author.name}\nHaba ng awitin: ${time}\n${info.videoDetails.video_url}\nOras ng iyong paghihintay: ${time_}s\nLaki ng file: ${mb.toFixed(2)}`, msgID, (e, m) => {})
									}
									api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
									console.log("Done")
								})
							}, 500)
						}
					})
				}, event.threadID, (e, m) => {
					if(e){
						api.editMessage(e.message, msgID, (e, m) => {})
						// api.editMessage(e.message, msgID, (e, m) => {})
						api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
						afk(api, json)
					}
				}, msgID)
				api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
			})
		}catch(err){
			console.log(err)
			api.editMessage("Error: " + err, msgID, (e, m) => {})
			if(fs.existsSync(filename)){
				fs.unlink(filename, (e) => {})
			}
			api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
		}
	})
}
