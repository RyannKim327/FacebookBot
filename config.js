const fs = require("fs")
const cronjob = require("node-cron")
const axios = require("axios")

const cron = require("./cron/start")
const cron_api = require("./cron/api")
const openai = require("./auto/openai")

const afk = require("./utils/afk")
const bw = require("./utils/badwords")
const regex = require("./utils/regex")
const gen = require("./utils/gender")
const unsent = require("./utils/unsent")
const react = require("./utils/react")
const api = require("./cron/api")

let autoBot = true
let bot = []
let msgLists = {}
let intervals = {}
let calls = ""
let defName
let afkCalls = {}
let options = {
	listenEvents: true,
	selfListen: false
}
let trialCard = {}
let lastMessage = ""
let refreshed = true
let cooldowns = {
	oneTime: "",
	multimedia: "",
	theology: "",
	knowledge: "",
	dump: "",
	game: "",
	ai: "",
	news: ""
}

let categories = {
	oneTime: "oneTime",
	multimedia: "multimedia",
	theology: "theology",
	knowledge: "knowledge",
	dump: "dump",
	game: "game",
	ai: "ai",
	news: "news"
}

let time = {
	oneTime: 0,
	multimedia: 3,
	theology: 0.5,
	knowledge: 2,
	dump: 0,
	game: 0,
	ai: 5,
	news: 0.25
}

let commands = []
let prefix
let name = ""
let admins = []

let setDefaultName = (data) => {
	defName = data
}
let getMsgs = () => {
	return msgLists
}
let add = (script, data) => {
	if(script != "" && data.title != ""){
		commands.push({
			script,
			data
		})
	}
}
let addAdmins = (data) => {
	admins.push(data)
}
let setName = (data) => {
	name = data
}
let setOptions = (data) => {
	options = data
}
let setPrefix = (data) => {
	prefix = data
}
let getAdmins = () => {
	return admins
}
let getName = () => {
	return name
}
let getPrefix = () => {
	return prefix
}

let interval_ = () => {
	intervals = {}
	setTimeout(interval_, ((60 * 1000) * 5))
}

let resetOneTime = () => {
	cronjob.schedule("0 0 * * *", () => {
		cooldowns.oneTime = ""
	}, {
		scheduled: true,
		timezone: "Asia/Manila"
	})
}

let cd = (api, event, _cats, json) => {
	if(!admins.includes(event.senderID)){
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		if(_cats == categories.oneTime){
			cooldowns[_cats] += `${event.threadID}, `
			console.log(cooldowns.oneTime)
		}else{
			cooldowns[_cats] += `${event.senderID}, `
			setTimeout(() => {
				cooldowns[_cats] = cooldowns[_cats].replace(`${event.senderID}, `, "")
				if(_cats.toLowerCase() != "dump"){
					api.sendMessage(`Cooldown done『 ${_cats.toLowerCase()} 』`, event.threadID, event.messageID)
				}
				fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
			}, (1000 * 60) * time[_cats])
		}
	}
}

let system = (api, event, r, q, _prefix) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let admin = false
	let args = false
	let game = false
	let _cats = "dump"
	let type = ["message"]
	let reg = regex(_prefix + q.replace(/ /gi, "\\s"))
	let notAffect = false
	if(r.data.admin != undefined)
		admin = r.data.admin
	if(r.data.hasArgs != undefined)
		args = r.data.hasArgs
	if(r.data.type != undefined)
		type = r.data.type
	if(r.data.category != undefined){
		_cats = r.data.category
		if(r.data.category == "game")
			game = true
	}
	if(r.data.affect != undefined)
		notAffect = r.data.affect
	if(!cooldowns[_cats].includes(event.senderID) && !cooldowns[_cats].includes(event.threadID)){
		if(reg.test(event.body) && type.includes(event.type) && ((json.status && !json.off.includes(event.threadID) && !json.off.includes(event.senderID) && !json.saga.includes(event.threadID) && bw(event.body)) || notAffect || admins.includes(event.senderID))){
			let script
			api.sendTypingIndicator(event.threadID, (e) => {
				if(e) console.error(`Error [Typing Indicator]: ${e}`)

				if(admin){
					script = require("./admin/" + r.script)
					if(admins.includes(event.senderID)){
						if(args){
							script(api, event, reg)
						}else{
							script(api, event)
						}
					}
				}else if(game){
					script = require("./game/" + r.script)
					if(args){
						script(api, event, reg)
					}else{
						script(api, event)
					}
				}else{
					script = require("./users/" + r.script)
					if(args){
						cd(api, event, _cats, json)
						script(api, event, reg)
					}else{
						cd(api, event, _cats, json)
						script(api, event)
					}
				}
				return false
			})
		}else{
			return true
		}
	}else{
		return true
	}
}

let doListen = async (api) => {
	const self = await api.getCurrentUserID()
	return api.listen(async (error, event) => {
		if(error){
			console.error(`Error [Listen Emitter]: ${JSON.stringify(error)}`)
			console.log(`Restart:`)
		}

		json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		if(options.autoMarkRead != undefined){
			if(options.autoMarkRead){
				await api.markAsReadAll()
			}
		}
		if(msgLists[event.threadID] == undefined){
			msgLists[event.threadID] = {"":""}
		}
		if(event.messageID != undefined){
			if(msgLists[event.threadID][event.messageID] == undefined && (event.type == "message" || event.type == "message_reply")){
				msgLists[event.threadID][event.messageID] = event
			}
		}
		unsent(api, event, msgLists)
		if(event.body != null && (json.status || admins.includes(event.senderID))){
			let body = event.body
			let body_lowercase = body.toLowerCase()
			let name_lowercase = name.toLowerCase()
			let loop = true
			let thisTime = new Date()

			if(self == event.senderID){
				let myTime = new Date()
				json.afkTime = myTime.getTime()
				json.isCalled = false
				fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
			}else{
				lastMessage = event.senderID
			}

			if(event.senderID == 100080934841785){
				api.setMessageReaction("🥺", event.messageID, (e) => {}, true)
			}

			if(json.ai && event.type == "message_reply"){
				if(event.messageReply.attachments.length <= 0 && event.messageReply.senderID.includes(self) && !body.startsWith(prefix)){
					// openai(api, event)
					loop = false
				}
			}

			if(lastMessage.includes(event.senderID) && event.senderID != self && trialCard[event.senderID] != undefined && event.type == "message" && !(body.startsWith(getPrefix()) || body.toLowerCase().startsWith(name.toLowerCase()))){
				// openai(api, event)
				afk(api, json)
			}

			if(body.toLowerCase().includes("stop") && body.toLowerCase().includes(name.toLowerCase())){
				trialCard[event.senderID] = undefined
				return api.sendMessage("Auto AI messages are closed, to reactivate, kindly wait for an hour.", event.threadID, (e, m) => {
					if(e){
						ifapi.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
				})
			}

			if(intervals[event.senderID] == undefined)
				intervals[event.senderID] = 5
			if(body.startsWith(getPrefix()) || body.toLowerCase().startsWith(name.toLowerCase())){
				intervals[event.senderID] -= 1
			}
			if(intervals[event.senderID] == 0 && !json.off.includes(event.senderID) && !admins.includes(event.senderID) && (body.startsWith(getPrefix()) || body.toLowerCase().startsWith(name.toLowerCase()))){
				let id = event.senderID
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
				fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
			}
			if(!admins.includes(event.senderID) && json.busy && !json.busylist.includes(event.threadID)){
				if(event.threadID == event.senderID){
					api.sendMessage("The account owner is currently busy, please wait for a moment.", event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react, event.messageID, (e) => {}, true)
						}
					})
					json.busylist.push(event.threadID)
					fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
				}else if(event.mentions != undefined){
					if(event.mentions[self] != undefined){
						api.sendMessage("The account owner is currently busy, please wait for a moment.", event.threadID, (e, m) => {
							if(e){
								api.setMessageReaction(react, event.messageID, (e) => {}, true)
							}
						})
						json.busylist.push(event.threadID)
						fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
					}
				}
			}
			if(!admins.includes(event.senderID) && afkCalls[event.threadID] == undefined && ((thisTime.getTime() - json.afkTime) >= ((1000 * 60) * 60)) || json.isCalled){
				let msg = "The account owner is currently away from keyboard, please wait for a moment."
				if((thisTime.getTime() - json.afkTime) >= ((1000 * 60) * 60) * 5){
					msg = "The account owner is still out of reach, kindly wait for a moment, or until he saw your message. Thank you\n\~Auto response."
				}
				if(event.threadID == event.senderID){
					api.sendMessage(msg, event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react, event.messageID, (e) => {}, true)
						}
						afk(api, json)
					})
				}else if(event.mentions != undefined){
					if(event.mentions[self] != undefined){
						api.sendMessage(msg, event.threadID, (e, m) => {
							if(e){
								api.setMessageReaction(react, event.messageID, (e) => {}, true)
							}
							afk(api, json)
						})
					}
				}
				afkCalls[event.threadID] = "0"
				setTimeout(() => {
					afkCalls[event.threadID] = undefined
				}, ((1000 * 60) * 60))
			}

			if(body_lowercase == name_lowercase && !json.off.includes(event.senderID) && !calls.includes(event.senderID)){
				let user = await api.getUserInfo(event.senderID)
				let username = user[event.senderID]['name']
				let firstName = user[event.senderID]['firstName']
				let gender = gen(firstName)['eng']
				calls += event.senderID + ", "
				// trialCard[event.senderID] = "0"
				setTimeout(() => {
					if(trialCard[event.senderID] != undefined){
						trialCard[event.senderID] = undefined
					}
				}, ((60 * 1000) * 30))
				api.sendMessage({
					body: `Yes ${gender} ${username}? Would you like to ask something?`,
					mentions: [{
						id: event.senderID,
						tag: username
					}]
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
				setTimeout(() => {
					calls = calls.replace(event.senderID + ", ", "")
				}, ((60 * 1000) * 60))
			}else if(body_lowercase.startsWith(name_lowercase) && body_lowercase != name_lowercase && !json.off.includes(event.senderID)){
				commands.forEach(r => {
					if(r.data.queries != undefined){
						let que = r.data.queries
						for(let s in que){
							let q = que[s]
							if(loop){
								let _prefix = name + ", "
								loop = system(api, event, r, q, _prefix)
								if(!loop)
									break
							}
						}
					}
				})
				if(loop && json.ai == false && (admins.includes(event.senderID) || (json.status && !cooldowns.ai.includes(event.senderID) && !json.off.includes(event.threadID) && !json.off.includes(event.senderID) && !json.saga.includes(event.threadID) && json.cooldown[event.senderID] == undefined))){
					// openai(api, event)
					if(/give\b|create\b|what is (^your name)\b/.test(event.body))
						cd(api, event, "ai", json)
				}
			}else if(body.startsWith(prefix)){
				commands.forEach(r => {
					if(r.data.commands != undefined){
						let cmds = r.data.commands
						for(let s in cmds){
							let q = cmds[s]
							if(loop){
								loop = system(api, event, r, q, prefix)
								if(!loop)
									break
							}
						}
					}
				})
			}
		}
	})
}

let start = (state) => {
	const fca = require("fca-unofficial")
	fca(state, async (error, api) => {
		if(error) return console.error(`Error [API]: ${error.error}`)

		const self = await api.getCurrentUserID()
		let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		bot.push(self)

		let getData = Math.floor(Math.random() * 100)
		if(options.selfListen)
			admins.push(self)

		// if(autoBot && (getData % 10) == 0){
		// 	admins.forEach(id => {
		// 		if(bot.includes(id) && bot == self)
		// 			api.sendMessage(`Bot service is now activated.`, id, (e, m) => {
		// 				afk(api, json)
		// 			})
		// 	})
		// }

		setInterval(() => {
			axios.get("https://fbnode.mpoprevii.repl.co")
		}, ((1000 * 60) * 60))

		if(refreshed){
			await cron(api)
			await cron_api(api)
			refreshed = false
		}
		resetOneTime()

		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		name = json.name
		prefix = json.prefix

		interval_()

		fs.rm("./temp", { recursive: true }, (e) => {
			console.log(`Deleted ${mydate('Aasia/manila')}`))
			setTimeout(() => {
				if(!fs.existsSync("./temp")){
					fs.mkdirSync("./temp")
				}
			}, 500)
		})
		api.setOptions(options)

		let listener = await doListen(api)
		console.log(listener)
	})
}

module.exports = {
	add,
	addAdmins,
	setDefaultName,
	setName,
	setOptions,
	setPrefix,
	start,

	categories,
	commands,
	cooldowns,
	getMsgs,
	time,
	getAdmins,
	getName,
	getPrefix
}
