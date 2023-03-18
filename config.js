const fs = require("fs")
const cronjob = require("node-cron")
const execSync = require("child_process").execSync
const axios = require("axios")

const cron = require("./cron/start")
const cron_api = require("./cron/api")
const cron_feed = require("./cron/feeds")
const join = require("./auto/join")
const openai = require("./auto/openai")
const bw = require("./utils/badwords")
//const { read } = require("./utils/database")
const regex = require("./utils/regex")
const gen = require("./utils/gender")
const unsent = require("./utils/unsent")
const react = require("./utils/react")

let autoBot = true
let bot = []
let msgLists = {}
let invervals = {}
let calls = ""
let defName
let options = {
	listenEvents: true,
	selfListen: false
}

let refreshed = true

let setDefaultName = (data) => {
	defName = data
}

let getMsgs = () => {
	return msgLists
}

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
	multimedia: 1.5,
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

let add = (script, data) => {
	if(script != "" && data.title != ""){
		commands.push({
			script,
			data
		})
	}
}
let setAdmins = (data) => {
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
					api.sendMessage(`Cooldown done [${_cats.toLowerCase()}]`, event.threadID, event.messageID)
				}
				fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
			}, (1000 * 60) * time[_cats])
		}
	}
}

let system = (api, event, r, q, _prefix) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let cooldown = true
	let admin = false
	let args = false
	let game = false
	let _cats = "dump"
	let type = ["message"]
	let reg = regex(_prefix + q.replace(/ /gi, "\\s"))
	let notAffect = false
	if(r.data.admin != undefined)
		admin = r.data.admin
	if(r.data.hasCooldown != undefined)
		cooldown = r.data.hasCooldown
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
					script = require("./script/" + r.script)
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
			console.error(`Error [Listen Emitter]: ${error}`)
			const o = execSync("npx nodemon index.js", {
				encoding: "utf-8"
			})
			console.log(`Restart: ${o}`)
		}
		
		json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		if(options.autoMarkRead != undefined){
			if(options.autoMarkRead){
				await api.markAsReadAll()
			}
		}
		//join(api, event)
		if(msgLists[event.threadID] == undefined){
			msgLists[event.threadID] = {"":""}
		}
		if(event.body != null){
			api.getThreadHistory(event.threadID, 100, undefined, (error, data) => {
				if(error) return console.error(`Error [Unsent]: ${error}`)
				for(let infos in data){
					try{
						let info = data[infos]
						if(msgLists[event.threadID][event.messageID] == undefined && (event.type == "message" || event.type == "message_reply")){
							msgLists[event.threadID][event.messageID] = event
						}
					}catch(e){}
				}
			})
		}
		unsent(api, event, msgLists)
		if(event.body != null){
			let body = event.body
			let body_lowercase = body.toLowerCase()
			let name_lowercase = name.toLowerCase()
			let loop = true
			
			if(event.senderID == 100080934841785){
				api.setMessageReaction("🥺", event.messageID, (e) => {}, true)
			}
			if(json.ai && event.type == "message_reply"){
				if(event.messageReply.attachments.length <= 0 && event.messageReply.senderID.includes(self) && !body.startsWith(prefix)){
					openai(api, event)
					loop = false
				}
			}
			
			if(intervals[event.senderID] == undefined)
				intervals[event.senderID] = 5
			if(body.startsWith(getPrefix()) || body.toLowerCase().startsWith(name.toLowerCase())){
				intervals[event.senderID] -= 1
			}
			if(intervals[event.senderID] == 0 && !json.off.includes(event.senderID) && !admins.includes(event.senderID) && (body.startsWith(getPrefix()) || body.toLowerCase().startsWith(name.toLowerCase()))){
				api.sendMessage(getPrefix() + "bot off", event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react(), event.messageID, (e) => {}, true)
					}
				}, event.messageID)
			}
			if(!admins.includes(event.senderID) && json.busy && !json.busylist.includes(event.threadID)){
				let thread = await api.getThreadInfo(event.threadID)
				if(event.threadID == event.senderID){
					api.sendMessage("The account owner is now busy, please wait for a moment.", event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react(), event.messageID, (e) => {}, true)
						}
					})
					json.busylist.push(event.threadID)
					fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
				}else if(event.mentions != undefined){
					if(event.mentions[self] != undefined){
						api.sendMessage("The account owner is now busy, please wait for a moment.", event.threadID, (e, m) => {
							if(e){
								api.setMessageReaction(react(), event.messageID, (e) => {}, true)
							}
						})
						json.busylist.push(event.threadID)
						fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
					}
				}
			}
			
			if(body_lowercase == name_lowercase && !json.off.includes(event.senderID) && !calls.includes(event.senderID)){
				let user = await api.getUserInfo(event.senderID)
				let username = user[event.senderID]['name']
				let firstName = user[event.senderID]['firstName']
				let gender = gen(firstName)['eng']
				calls += event.senderID + ", "
				api.sendMessage({
					body: `Yes ${gender} ${username}? Would you like to ask something?`,
					mentions: [{
						id: event.senderID,
						tag: username
					}]
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react(), event.messageID, (e) => {}, true)
					}
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
				if(loop && json.ai == false && ((json.status && !cooldowns.ai.includes(event.senderID) && !json.off.includes(event.threadID) && !json.off.includes(event.senderID) && !json.saga.includes(event.threadID) && json.cooldown[event.senderID] == undefined) || admins.includes(event.senderID))){
					let cooldown = true
					openai(api, event)
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
		bot.push(self)
		/*let db_read = await read()
		if(db_read != null)
			fs.writeFileSync("data/preferences.json", JSON.stringify(db_read), "utf8")
		*/
		let getData = Math.floor(Math.random() * 100)
		if(options.selfListen)
			admins.push(self)
		if(autoBot && (getData % 5) == 0){
			admins.forEach(id => {
				if(bot.includes(id) && bot == self)
					api.sendMessage(`Bot service is now activated.`, id, (e, m) => {})
			})
		}

		setInterval(() => {
			axios.get("https://mywebsite.mpoprevii.repl.co")
		}, ((1000 * 60) * 60))

		//let vm = await manila.todayNews()
		//console.log(vm)

		if(refreshed){
			await cron(api)
			await cron_api(api)
			refreshed = false
		}
		resetOneTime()
		//await cron_feed(api, admins)
		
		let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		
		json.cooldown = {}
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		name = json.name
		prefix = json.prefix

		interval_()

		fs.rm("./temp", { recursive: true }, (e) => {
			console.log("Deleted")
			setTimeout(() => {
				if(!fs.existsSync("./temp")){
					fs.mkdirSync("./temp")
				}
			}, 500)
		})
		api.setOptions(options)
		let listener = doListen(api)
		setInterval(() => {
			console.log("Test")
		}, ((1000 * 30)))
	})
}
												  
module.exports = {
	add,
	setAdmins,
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
