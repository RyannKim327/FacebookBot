const fs = require("fs")
const { getAdmins } = require("./../config")
const react = require("./../utils/react")

let subs = (id, data) => {
	data += `${id}, `
	return data
}

let unsubs = (id, data) => {
	let d = data.replace(`${id}, `, "")
	return d
}

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let prefix = json.prefix
	let data = json.subscribe
	let thread = await api.getThreadInfo(event.threadID)
	console.log("Subs")
	if(!data.includes(event.threadID) && event.body == `${prefix}subscribe`){
		let ids = []
		for(let i in thread.adminIDs){
			ids.push(thread.adminIDs[i].id)
		}
		if(thread.isGroup && (ids.includes(event.senderID) || getAdmins().includes(event.senderID) || event.senderID == api.getCurrentUserID())){
			json.subscribe = subs(event.threadID, data)
			api.sendMessage(`The thread ${thread.threadName} is now subscribed to the cron features.`, event.threadID, (error, msg) => {
				if(error){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}else if(event.threadID == event.senderID){
			json.subscribe = subs(event.threadID, data)
			let user = await api.getUserInfo(event.threadID)
			api.sendMessage(`You are now subscribed to the cron features ${user[event.threadID]['name']}. To unsubscribe, kindly message ${prefix}unsubscribe`, event.threadID, (error, msg) => {
				if(error){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}
	}else if(data.includes(event.threadID) && event.body == `${prefix}unsubscribe`){
		json.subscribe = unsubs(event.threadID, data)
		let ids = []
		for(let i in thread.adminIDs){
			ids.push(thread.adminIDs[i].id)
		}
		if(thread.isGroup && ((ids.includes(event.senderID) || getAdmins().includes(event.senderID)) || event.senderID == api.getCurrentUserID())){
			json.subscribe = unsubs(event.threadID, data)
			api.sendMessage(`The thread ${thread.threadName} is now unsubscribed to the cron features.`, event.threadID, (error, msg) => {
				if(error){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}else if(event.threadID == event.senderID){
			json.subscribe = unsubs(event.threadID, data)
			let user = await api.getUserInfo(event.threadID)
			api.sendMessage(`You are now unsubscribed to the cron feature.  ${user[event.threadID]['name']}`, event.threadID, (error, msg) => {
				if(error){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}