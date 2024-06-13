const fs = require("fs")
const ytdl = require('ytdl-core');

module.exports = async (api, event) => {
	if(event.type == "event"){
		if(event.logMessageType == "log:unsubscribe"){
			const songs = [
				"Exi25VAo6wU",
				"6iuUC8Gai9k",
				"TGyLsf7PRpU",
				"miyLBv04O5o",
				"C27NShgTQE4",
				"MWC291t05ec",
				"xOkBD4uPkcw"
			]
			const song = songs[Math.floor(Math.random() * songs.length)]
			const yt = ytdl(`https://www.youtube.com/watch?v=${song}`, {
				quality: "lowestaudio"
			})
			const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${song}`)
			const name = `${__dirname}/../temp/${event.logMessageData.leftParticipantFbId}_farewell.mp3`
			const file = fs.createWriteStream(`temp/${event.logMessageData.leftParticipantFbId}_farewell.mp3`)
			const user = await api.getUserInfo(event.logMessageData.leftParticipantFbId)
			const fullname = user[event.logMessageData.leftParticipantFbId]['name']
			yt.pipe(file).on("end", () => {
				api.sendMessage({
					"body": `Farewell to you ${fullname}, we will miss you\nA song dedicated for you entitiled: ${info.videoDetails.title}`,
					"attachment": fs.createReadStream(name).on("end", () => {
						if(fs.existsSync(name)){
							fs.unlink(name, (e) => {})
						}
					})
				}, event.threadID, (e, m) => {})
			})
		}
	}
}
