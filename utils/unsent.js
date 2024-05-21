const { getAdmins } = require("./../config")

const http = require("https")
const fs = require("fs")
const afk = require("./afk")

module.exports = async (api, event, msgLists) => {
	const self = await api.getCurrentUserID()
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let onMonitor = ["5949341968502700", "6679894578723312", "4740250299437612", "5401028143307467", "5500055473411242", "100018362431224", "5572548646186754", "4780024218775309", "5893956287308812", "5424954817625723", "3527050254067351", "4650249085041633", "6094178293994418"]
	if(msgLists[event.threadID] != undefined){
		if(msgLists[event.threadID][event.messageID] != undefined){
			let lists = msgLists[event.threadID][event.messageID]
			const admins = getAdmins()
			if(event.type == "message_unsend" && admins.includes(event.senderID)){
				let { body, attachments, threadID, timestamp, senderID } = lists
				let content = "Unsent message:\n"
				let thread = await api.getThreadInfo(threadID)
				let user = await api.getUserInfo(senderID)
				if(thread.isGroup){
					content += `From: ${thread.threadName}\nBy: ${user[senderID]['name']}\n\nContent:`
				}else{
					let usrThread = await api.getUserInfo(event.threadID)
					content += `From: A private convo of ${usrThread[event.threadID]['name']}\nBy: ${user[senderID]['name']}\n\nContent:`
				}
				content += (body == '') ? " " : "\n" + body
				if(attachments.length > 0){
					let type = ""
					switch(attachments[0].type){
						case "audio":
							type = ".mp3"
						break
						case "video":
							type = ".mp4"
						break
						case "photo":
							type = ".jpg"
						break
					}
					content += `${attachments[0].type} file`
					let file = fs.createWriteStream(`temp/unsent_${event.messageID}${type}`)
					http.get(attachments[0].url, (r) => {
						if(type != ""){
							r.pipe(file)
							file.on("finish", () => {
								api.sendMessage({
									body: content,
									attachment: fs.createReadStream(`${__dirname}/../temp/unsent_${event.messageID}${type}`).on("end", () => {
										if(fs.existsSync(`${__dirname}/../temp/unsent_${event.messageID}${type}`)){
											fs.unlink(`${__dirname}/../temp/unsent_${event.messageID}${type}`, (e) => {})
										}
									})
								}, 7045133965567738, (error, msg) => {
									afk(api, json)
								})
							})
						}
					})
				}else{
					api.sendMessage({
						body: content
					}, 7045133965567738, (error, msg) => {
						afk(api, json)
					})
				}
			}
		}
	}
}
