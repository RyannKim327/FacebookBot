const fs = require("fs")
const cron = require("./cron/start")
const cron_api = require("./cron/api")
const cron_feed = require("./cron/feeds")
const join = require("./auto/join")
const openai = require("./auto/openai")
const bw = require("./utils/badwords")
//const { read } = require("./utils/database")
const regex = require("./utils/regex")
const manila = require("manilatimes-scrape")
const gen = require("./utils/gender")

let autoBot = true
let invervals = {}
let calls = []
let options = {
	listenEvents: true,
	selfListen: false
}

let cooldowns = {
	oneTime: "",
	multimedia: "",
	theology: "",
	knowledge: "",
	dump: "",
	ai: ""
}

let categories = {
	oneTime: "oneTime",
	multimedia: "multimedia",
	theology: "theology",
	knowledge: "knowledge",
	dump: "dump",
	ai: "ai"
}

let time = {
	oneTime: 0,
	multimedia: 1.5,
	theology: 0.5,
	knowledge: 2,
	dump: 0,
	ai: 5
}

let commands = []
let prefix
let name
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
let setName = (data, id) => {
	name[id] = data
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
	setTimeout(interval_, 90000)
}

let cd = (api, event, _cats, json) => {
	if(!admins.includes(event.senderID)){
		cooldowns[_cats] += `${event.senderID}, `
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		setTimeout(() => {
			cooldowns[_cats] = cooldowns[_cats].replace(`${event.senderID}, `, "")
			api.sendMessage(`Cooldown done [${_cats.toLowerCase()}]`, event.threadID, event.messageID)
			fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
		}, (1000 * 60) * time[_cats])
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
	if(r.data.game != undefined)
		game = r.data.game
	if(r.data.type != undefined)
		type = r.data.type
	if(r.data.category != undefined)
		_cats = r.data.category
	if(r.data.affect != undefined)
		notAffect = r.data.affect
	
	if(!cooldowns[_cats].includes(event.senderID)){
		if(reg.test(event.body) && type.includes(event.type) && ((json.status && !json.off.includes(event.threadID) && !json.off.includes(event.senderID) && !json.saga.includes(event.threadID) && bw(event.body)) || notAffect || admins.includes(event.senderID))){
			let script
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
		}else{
			return true
		}
	}else{
		return false
	}
}

let start = (state) => {
	const fca = require("fca-unofficial")
	fca(state, async (error, api) => {
		if(error) return console.error(`Error [API]: ${error.error}`)
		
		const self = await api.getCurrentUserID()
		
		/*let db_read = await read()
		if(db_read != null)
			fs.writeFileSync("data/preferences.json", JSON.stringify(db_read), "utf8")
		*/
		if(options.selfListen)
			admins.push(self)
		if(autoBot){
			admins.forEach(id => {
				api.sendMessage(`Bot service is now activated.`, id, (e, m) => {})
			})
		}

		//let vm = await manila.todayNews()
		//console.log(vm)
		
		await cron(api)
		await cron_api(api)
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
		let listen = api.listen(async (error, event) => {
			if(error){
				console.error(`Error [Listen Emitter]: ${error}`)
				autoBot = false
				api.sendMessage("Bot Auto refresh mode", self)
				listen.stopListening()
				start(state)
			}
			
			json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
			if(options.autoMarkRead != undefined){
				if(options.autoMarkRead){
					await api.markAsReadAll()
				}
			}

			//join(api, event)
			
			if(event.body != null){
				let body = event.body
				let body_lowercase = body.toLowerCase()
				let name_lowercase = name.toLowerCase()
				let loop = true

				if(json.ai && event.type == "message_reply"){
					if(event.messageReply.attachments.length <= 0 && event.messageReply.senderID.includes(self) && !body.startsWith(prefix)){
						openai(api, event)	
						console.log("AI")
						loop = false
					}
				}
				
				if(intervals[event.senderID] == undefined)
					intervals[event.senderID] = 5

				if(intervals[event.senderID] == 0 && !json.off.includes(event.senderID) && !admins.includes(event.senderID))
					api.sendMessage(getPrefix() + "off", event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction("✨", event.messageID, (e) => {}, true)
						}
					}, event.messageID)
				
				if(!admins.includes(event.senderID) && json.busy && !json.busylist.includes(event.threadID)){
					let thread = await api.getThreadInfo(event.threadID)
					if(thread.isGroup == false){
						api.sendMessage("The account owner is now busy, please wait for a moment.", event.threadID, (e, m) => {
							if(e){
								api.setMessageReaction("✨", event.messageID, (e) => {}, true)
							}
						})
						json.busylist.push(event.threadID)
						fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
					}else if(event.mentions != undefined){
						if(event.mentions[self] != undefined){
							api.sendMessage("The account owner is now busy, please wait for a moment.", event.threadID, (e, m) => {
								if(e){
									api.setMessageReaction("✨", event.messageID, (e) => {}, true)
								}
							})
							json.busylist.push(event.threadID)
							fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
						}
					}
				}
				
				if(body_lowercase == name_lowercase && !json.off.includes(event.senderID) && !calls.includes(event.senderID)){
					intervals[event.senderID] -= 1
					let user = await api.getUserInfo(event.senderID)
					let username = user[event.senderID]['name']
					let firstName = user[event.senderID]['firstName']
					let gender = gen(firstName)['eng']
					calls.push(event.senderID)
					api.sendMessage({
						body: `Yes ${gender} ${username}? Would you like to ask something?`,
						mentions: [{
							id: event.senderID,
							tag: username
						}]
					}, event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction("✨", event.messageID, (e) => {}, true)
						}
					})
					// api.sendMessage("I'm still alive. Something you wanna ask for?", event.threadID)
					//api.sendMessage(JSON.stringify(intervals), self)
				}else if(body_lowercase.startsWith(name_lowercase)){
					intervals[event.senderID] -= 1
					commands.forEach(r => {
						if(r.data.queries != undefined){
							r.data.queries.forEach(q => {
								if(loop){
									let _prefix = name + ", "
									loop = system(api, event, r, q, _prefix)
								}
							})
						}
					})
					if(loop && json.ai == false && ((json.status && !cooldowns.ai.includes(event.senderID) && !json.off.includes(event.threadID) && !json.off.includes(event.senderID) && !json.saga.includes(event.threadID) && json.cooldown[event.senderID] == undefined) || admins.includes(event.senderID))){
						let cooldown = true
						openai(api, event)
						cd(api, event, "ai", json)
					}
				}else if(body.startsWith(prefix)){
					intervals[event.senderID] -= 1
					commands.forEach(r => {
						if(r.data.commands != undefined){
							r.data.commands.forEach(q => {
								if(loop){
									loop = system(api, event, r, q, prefix)
								}
							})
						}
					})
				}
			}
		})
	})
}
												  
module.exports = {
	add,
	setAdmins,
	setName,
	setOptions,
	setPrefix,
	start,

	categories,
	commands,
	cooldowns,
	time,
	getAdmins,
	getName,
	getPrefix
}
