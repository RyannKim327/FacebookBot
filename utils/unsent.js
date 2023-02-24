const http = require("https")
const fs = require("fs")
module.exports = async (api, event, msgLists) => {
	const self = await api.getCurrentUserID()
	//if(event.type == "message" || event.type == "message_unsend" && event.senderID == self){
	//	console.log(event)
	//}
	let onMonitor = ["100018362431224", "5572548646186754", "4780024218775309"]
	if(msgLists[event.threadID] != undefined){
		if(msgLists[event.threadID][event.messageID] != undefined){
			let lists = msgLists[event.threadID][event.messageID]
			if(event.type == "message_unsend"){
					console.log(lists)
			}
			if(event.type == "message_unsend" && onMonitor.includes(event.threadID)){
				let { body, attachments, threadID, senderID } = lists
				let content = "Unsent message:\n"
				let thread = await api.getThreadInfo(threadID)
				let user = await api.getUserInfo(senderID)
				if(thread.isGroup){
					content += `From: ${thread.threadName}\nBy: ${user[senderID]['name']}\n\nContent:`
				}else{
					content += `From: A private convo\nBy: ${user[senderID]['name']}\n\nContent:`
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
								}, api.getCurrentUserID(), (error, msg) => {})
							})
						}
					})
				}else{
					api.sendMessage({
						body: content
					}, api.getCurrentUserID(), (error, msg) => {})
				}
			}
		}
	}
}