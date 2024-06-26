const fs = require("fs")
const cronjob = require("node-cron")

const left = require("./auto/left")

const cron = require("./cron/start")
const cron_api = require("./cron/api")
const openai = require("./auto/openai")
const logs = require("./utils/logs")

const mydate = require("./utils/date")
const afk = require("./utils/afk")
const bw = require("./utils/badwords")
const regex = require("./utils/regex")
const gen = require("./utils/gender")
const unsent = require("./utils/unsent")
const react = require("./utils/react")
const api = require("./cron/api")
const appstate = require("./appstate")

const { spawn } = require("child_process")

const setup = JSON.parse(fs.readFileSync("setup/data.json", "utf-8"))

const username = "admin@mpop.ph"
const password = "verystrongpasswordnakayakangipaglaban"

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
let vips = ""
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

let time = setup['time']

let commands = []
let prefix
let name = ""
let admins = []
let gc = ""

function setDefaultName(data) {
	defName = data
}

function getMsgs() {
	return msgLists
}
function add(script, data) {
	if(script != "" && data.title != ""){
		commands.push({
			script,
			data
		})
	}
}

function setCommands(data) {
	if(typeof data != 'object'){
		try{
			data = JSON.parse(data)
		}catch(e){
			return console.error("This can't be converted to JSON")
		}
	}
	commands = data
}
function addAdmins(data) {
	admins.push(data)
}
function setAdminGroup(data){
	gc = data
}
function addVip (id) {
	vips +=  `${id}, `
}
function removeVip(id) {
	vips.replace(`${id}, `, "")
}
function checkVip() {
	return vips
}
function setName(data) {
	name = data
}
function setOptions(data) {
	options = data
}
function setPrefix(data) {
	prefix = data
}
function getAdmins() {
	return admins
}
function getAdminGroup() {
	return gc
}
function getName() {
	return name
}
function getPrefix() {
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
	console.log(vips)
	if(admins.includes(event.senderID) || vips.includes(event.senderID)){
		console.log("Vip e, no choice")
	}else{
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
			// api.sendTypingIndicator(event.threadID, (e) => {
			//	if(e) console.error(`Error [Typing Indicator]: ${JSON.stringify(e)}`)

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
			// })
		}else{
			return true
		}
	}else{
		return true
	}
}

let listener = async (api) => {
	const self = await api.getCurrentUserID()
	return api.listenMqtt(async (error, event) => {
		if(error){
			if(appstate(username, password)){
				const nodeProcess = spawn(process.argv[0], process.argv.slice(1), {
					detached: true,
					stdio: 'ignore'
				})
				nodeProcess.unref()
				process.exit()
				return start()
			}else{
				return console.error(`Error [Event]: ${error.message}`)
			}
		}
		let json_ = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		let thisTime = new Date()
		let loop = true
		if(options.autoMarkRead!= undefined){
			if(options.autoMarkRead){
				await api.markAsReadAll()
			}
		}
		if(msgLists[event.threadID] == undefined){
			msgLists[event.threadID] = {"":""}
		}
		if(event.messageID!= undefined){
			if(msgLists[event.threadID][event.messageID] == undefined && (event.type == "message" || event.type == "message_reply")){
				msgLists[event.threadID][event.messageID] = event
			}
		}
		unsent(api, event, msgLists)
		left(api, event)
		
		if(self == event.senderID){
			let myTime = new Date()
			json_.afkTime = myTime.getTime()
			json_.isCalled = false
			fs.writeFileSync("data/preferences.json", JSON.stringify(json_), "utf8")
		}else{
			lastMessage = event.senderID
		}

		if(json_.ai && event.type == "message_reply"){
			if(event.messageReply.attachments <= 0 && !event.messageReply.senderID.includes(self) && !body.startsWith(prefix)){
				openai(api, event)
				loop = false
			}
		}

		if(event.senderID != self && trialCard[event.senderID] != undefined && event.type == "message" && !(body.startsWith(getPrefix()) || body.toLowerCase().startsWith(name.toLowerCase()))){
			openai(api, event)
			afk(api, json_)
		}

		if(trialCard[event.senderID] != undefined && body.toLowerCase().includes("stop") && body.toLowerCase().includes(name.toLowerCase())){
			trialCard[event.senderID] = undefined
			return api.sendMessage("Auto AI messages are closed, to reactivate, kindly wait for an hour.", event.threadID, (e, m) => {
				if(e){
					api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
				}
			})
		}

		if(!vips.includes(event.senderID) && trialCard[event.senderID] != undefined && (body.startsWith(getPrefix()) || body.toLowerCase().startsWith(name.toLowerCase()))){
			if(intervals[event.senderID] == undefined){
				intervals[event.senderID] = 5
			}else if(intervals[event.senderID] <= 0){
				let id = event.senderID
				json_.off.push(id)
				api.sendMessage("The system detected a spam request from a user, the system was automatically banned for the bot requests. Please contact the developer or the bot admin to enable the commands again.", event.threadID, (e, m) => {}, event.messageID)
				fs.writeFileSync("data/preferences.json", JSON.stringify(json_), "utf8")
			}
			intervals[event.senderID] -= 1
		}

		if(!admins.includes(event.senderID) && json.busy && !json.busylist.includes(event.threadID)){
			if(event.threadID == event.senderID){
				api.sendMessage("The account owner is currently busy, please wait for a moment.", event.threadID, (e, m) => {
					if(e){
						api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
					}
				})
				json_.busylist.push(event.threadID)
				fs.writeFileSync("data/preferences.json", JSON.stringify(json_), "utf8")
			}else if(event.mentions != undefined){
				if(event.mentions[self] != undefined){
					api.sendMessage("The account owner is currently busy, please wait for a moment.", event.threadID, (e, m) => {
						if(e){
							api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
						}
					})
					json_.busylist.push(event.threadID)
					fs.writeFileSync("data/preferences.json", JSON.stringify(json_), "utf8")
				}
			}
		}

		if(!admins.includes(event.senderID) && afkCalls[event.threadID] == undefined && ((thisTime.getTime() - json_.afkTime) >= ((1000 * 60) * 60)) || json_.isCalled){
			let msg = "The account owner is currently away from keyboard, please wait for a moment."
			if((thisTime.getTime() - json.afkTime) >= ((1000 * 60) * 60) * 5){
				msg = "The account owner is still out of reach, kindly wait for a moment, or until he saw your message. Thank you\n\~Auto response."
			}
			if(event.threadID == event.senderID){
				api.sendMessage(msg, event.threadID, (e, m) => {
					if(e){
						api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
					}
					afk(api, json_)
				})
			}else if(event.mentions != undefined){
				if(event.mentions[self] != undefined){
					api.sendMessage(msg, event.threadID, (e, m) => {
						if(e){
							api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
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
	
		if(trialCard[event.senderID] == undefined && !json_.off.includes(event.senderID) && !calls.includes(event.senderID)){
			if(event.body.trim().toLowerCase() == name.toLowerCase() && event.senderID != self){
				let user = await api.getUserInfo(event.senderID)
				let username = user[event.senderID]['name']
				let firstName = user[event.senderID]['firstName']
				let gender = gen(firstName)['eng']
				calls += event.senderID + ", "
				trialCard[event.senderID] = "0"
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
						api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
					}
					afk(api, json_)
				})
				setTimeout(() => {
					calls = calls.replace(event.senderID + ", ", "")
				}, ((60 * 1000) * 60))
			}else if((event.body.toLowerCase().startsWith(name.toLowerCase()) && event.body.trim().toLowerCase() != name.toLowerCase())){
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
				if(loop && json.ai == false && (admins.includes(event.senderID) || (json_.status && !cooldowns.ai.includes(event.senderID) && !json_.off.includes(event.threadID) && !json_.off.includes(event.senderID) && !json_.saga.includes(event.threadID) && json_.cooldown[event.senderID] == undefined))){
					let _ = event.body.split(" ")
					_.shift()
					event.body = _.join(" ")
					openai(api, event)
					if(/give\b|create\b|what is (^your name)\b/.test(event.body))
						cd(api, event, "ai", json_)
				}
			}else if(event.body.startsWith(prefix)){
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

let doListen = async (api) => {
	const self = await api.getCurrentUserID()
	return api.listenMqtt(async (error, event) => {
		if(error){
			logs(`Error [Listen Emitter]: ${JSON.stringify(error)}`)
			console.log(`Restart:`)
		}

		let json_ = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
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
		unsent(api, event, msgLists, admins)
		left(api, event)
		if(event.body != null && (json_.status || admins.includes(event.senderID))){
			let body = event.body
			let body_lowercase = body.toLowerCase()
			let name_lowercase = name.toLowerCase()
			let loop = true
			let thisTime = new Date()
			
			if(json_['listen'] && self != event.senderID && !admins.includes(event.senderID) && gc != "" && event.threadID != gc){
				const thread = await api.getThreadInfo(event.threadID)
				const user = await api.getUserInfo(event.senderID)
				api.sendMessage({
					body: `From: ${user[event.senderID]['name']} of ${thread['threadName']} [${event.threadID}]:\n${event.body}`,
					attachment: event.attachments	
				}, gc, (e, m) => {})
			}

			if(self == event.senderID){
				let myTime = new Date()
				json_.afkTime = myTime.getTime()
				json_.isCalled = false
				fs.writeFileSync("data/preferences.json", JSON.stringify(json_), "utf8")
			}else{
				lastMessage = event.senderID
			}

			if(event.senderID == 100080934841785){
				api.setMessageReactionMqtt("🥺", event.messageID, (e) => {}, true)
			}

			if(json_.ai && event.type == "message_reply"){
				if(event.messageReply.attachments.length <= 0 && event.messageReply.senderID.includes(self) && !body.startsWith(prefix)){
					openai(api, event)
					loop = false
				}
			}

			if(lastMessage.includes(event.senderID) && event.senderID != self && trialCard[event.senderID] != undefined && event.type == "message" && !(body.startsWith(getPrefix()) || body.toLowerCase().startsWith(name.toLowerCase()))){
				openai(api, event)
				afk(api, json_)
			}

			if(trialCard[event.senderID] != undefined && body.toLowerCase().includes("stop") && body.toLowerCase().includes(name.toLowerCase())){
				trialCard[event.senderID] = undefined
				return api.sendMessage("Auto AI messages are closed, to reactivate, kindly wait for an hour.", event.threadID, (e, m) => {
					if(e){
						api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
					}
				})
			}

			if(!admins.includes(event.senderID) && json_.busy && !json_.busylist.includes(event.threadID)){
				if(event.threadID == event.senderID){
					api.sendMessage("The account owner is currently busy, please wait for a moment.", event.threadID, (e, m) => {
						if(e){
							api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
						}
					})
					json_.busylist.push(event.threadID)
					fs.writeFileSync("data/preferences.json", JSON.stringify(json_), "utf8")
				}else if(event.mentions != undefined){
					if(event.mentions[self] != undefined){
						api.sendMessage("The account owner is currently busy, please wait for a moment.", event.threadID, (e, m) => {
							if(e){
								api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
							}
						})
						json_.busylist.push(event.threadID)
						fs.writeFileSync("data/preferences.json", JSON.stringify(json_), "utf8")
					}
				}
			}

			if(!admins.includes(event.senderID) && afkCalls[event.threadID] == undefined && ((thisTime.getTime() - json_.afkTime) >= ((1000 * 60) * 60)) || json_.isCalled){
				let msg = "The account owner is currently away from keyboard, please wait for a moment."
				if((thisTime.getTime() - json_.afkTime) >= ((1000 * 60) * 60) * 5){
					msg = "The account owner is still out of reach, kindly wait for a moment, or until he saw your message. Thank you\n\~Auto response."
				}
				if(event.threadID == event.senderID){
					api.sendMessage(msg, event.threadID, (e, m) => {
						if(e){
							api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
						}
						afk(api, json_)
					})
				}else if(event.mentions != undefined){
					if(event.mentions[self] != undefined){
						api.sendMessage(msg, event.threadID, (e, m) => {
							if(e){
								api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
							}
							afk(api, json_)
						})
					}
				}
				afkCalls[event.threadID] = "0"
				setTimeout(() => {
					afkCalls[event.threadID] = undefined
				}, ((1000 * 60) * 60))
			}

			if(body_lowercase == name_lowercase && trialCard[event.senderID] == undefined && !json_.off.includes(event.senderID) && !calls.includes(event.senderID)){
				let user = await api.getUserInfo(event.senderID)
				let username = user[event.senderID]['name']
				let firstName = user[event.senderID]['firstName']
				let gender = gen(firstName)['eng']
				calls += event.senderID + ", "
				trialCard[event.senderID] = "0"
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
						api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
					}
					afk(api, json_)
				})
				setTimeout(() => {
					calls = calls.replace(event.senderID + ", ", "")
				}, ((60 * 1000) * 60))
			}else if(body_lowercase.startsWith(name_lowercase) && body_lowercase != name_lowercase && !json_.off.includes(event.senderID)){
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
				if(loop && json_.ai == false && (admins.includes(event.senderID) || (json_.status && !cooldowns.ai.includes(event.senderID) && !json_.off.includes(event.threadID) && !json_.off.includes(event.senderID) && !json_.saga.includes(event.threadID) && json_.cooldown[event.senderID] == undefined))){
					let _ = event.body.split(" ")
					_.shift()
					event.body = _.join(" ")
					openai(api, event)
					if(/give\b|create\b|what is (^your name)\b/.test(event.body))
						cd(api, event, "ai", json_)
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
				if(event.body != prefix && loop && json_.ai == false && (admins.includes(event.senderID) || (json_.status && !cooldowns.ai.includes(event.senderID) && !json_.off.includes(event.threadID) && !json_.off.includes(event.senderID) && !json_.saga.includes(event.threadID) && json_.cooldown[event.senderID] == undefined))){
					event.body = event.body.substring(1)
					openai(api, event)
					if(/give\b|create\b|what is (^your name)\b/.test(event.body))
						cd(api, event, "ai", json_)
				}
			}
		}
	})
}

let start = (state) => {
	const fca = require("@xaviabot/fca-unofficial")
	fca(state, async (error, api) => {
		if(error){
			logs(`Error [API]: ${error}`)	
		}
		
		const self = api.getCurrentUserID()
		let json_ = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		bot.push(self)

		let getData = Math.floor(Math.random() * 100)
		if(options.selfListen){
			admins.push(self)
		}
		if(gc != ""){
			let ad = await api.getThreadInfo(gc)
			const adm = ad.participantIDs 
			for(let i = 0; i < adm.length; i++){
				if(!admins.includes(self) && options.selfListen){
					admins.push(self)
				}else{
					if(!admins.includes(adm[i])){
						admins.push(adm[i])
					}
				}
			}
		}

		// if(autoBot && (getData % 10) == 0){
		// 	admins.forEach(id => {
		// 		if(bot.includes(id) && bot == self)
		// 			api.sendMessage(`Bot service is now activated.`, id, (e, m) => {
		// 				afk(api, json)
		// 			})
		// 	})
		// }

		// setInterval(() => {
			// axios.get("https://facebookbot-wm8g.onrender.com")
		// }, ((1000 * 60) * 60))

		if(refreshed){
			cron(api)
			cron_api(api)
			refreshed = false
		}
		resetOneTime()

		fs.writeFileSync("data/preferences.json", JSON.stringify(json_), "utf8")
		name = json_.name
		prefix = json_.prefix

		interval_()
		
		if(fs.existsSync(`${__dirname}/temp/`)){
			fs.rm(`${__dirname}/temp/`, { recursive: true }, (e) => {
				logs(`Deleted ${mydate('Asia/Manila')}`)
				setTimeout(() => {
					if(!fs.existsSync(`${__dirname}/temp/`)){
						fs.mkdirSync(`${__dirname}/temp/`)
						logs("Removed temp files")
					}
				}, 500)
			})
		}else{
			fs.mkdirSync(`${__dirname}/temp/`)
		}
		api.setOptions(options)

		let listener_ = await doListen(api)
		// console.log(listener_)
	})
}

module.exports = {
	add,
	addAdmins,
	setAdminGroup,
	setCommands,
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
	getAdminGroup,
	getName,
	getPrefix,

	checkVip,
	addVip,
	removeVip
}
