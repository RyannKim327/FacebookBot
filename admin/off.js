const { getPrefix } = require("./../config")
const fs = require("fs")
const react = require("./../utils/react")

module.exports = async (api, event) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let body = event.body.toLowerCase()
	if(body == (getPrefix() + "bot on")){
		if(event.type == "message_reply" && json.off.includes(event.messageReply.senderID)){
			let id = event.messageReply.senderID
			let user = await api.getUserInfo(id)
			let off = json.off
			if(off.length > 1){
				let x = off.join(", ")
				x = x.replace(id + ", ", "").replace(", " + id, "")
				json.off = x.split(", ")
			}else{
				json.off = []
			}
			api.sendMessage({
				body: `Bot actions are now enabled for ${user[id]['name']}`,
				mentions: [{
					id,
					tag: user[id]['name']
				}]
			}, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}else if(event.type == "message" && json.off.includes(event.threadID)){
			let id = event.threadID
			let thread = await api.getThreadInfo(id)
			let off = json.off
			if(off.length > 1){
				let x = off.join(", ")
				x = x.replace(id + ", ", "").replace(", " + id, "")
				json.off = x.split(", ")
			}else{
				json.off = []
			}
			if(thread.isGroup){
				api.sendMessage({
					body: `Bot actions are now enabled for ${thread.threadName}`
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
				})
			}else{
				let user = await api.getUserInfo(id)
				api.sendMessage({
					body: `Bot actions are now enabled for ${user[id]['name']}`,
					mentions: [{
						id,
						tag: user[id]['name']
					}]
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
				})
			}
		}
	}else if(body == (getPrefix() + "bot off")){
		if(event.type == "message_reply" && !json.off.includes(event.messageReply.senderID)){
			let id = event.messageReply.senderID
			let user = await api.getUserInfo(id)
			json.off.push(id)
			api.sendMessage({
				body: `Bot actions are now disabled for ${user[id]['name']}`,
				mentions: [{
					id,
					tag: user[id]['name']
				}]
			}, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
			})
		}else if(event.type == "message" && !json.off.includes(event.threadID)){
			let id = event.threadID
			let thread = await api.getThreadInfo(id)
			json.off.push(id)
			if(thread.isGroup){
				api.sendMessage({
					body: `Bot actions are now disabled for ${thread.threadName}`
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
				})
			}else{
				let user = await api.getUserInfo(id)
				api.sendMessage({
					body: `Bot actions are now disabled for ${user[id]['name']}`,
					mentions: [{
						id,
						tag: user[id]['name']
					}]
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
				})
			}
		}
	}
	fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
}
