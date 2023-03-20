const axios = require("axios")
const cronjob = require("node-cron")
const fs = require("fs")
const gateway = require("biblegateway-scrape")
const manila = require("manilatimes-scrape")

const afk = require("./../utils/afk")
const g = require("./../utils/gender")

let date = require("./../utils/date")

const music = require("./music")
const pasko = require("./christmas")

let today = async () => {
	let time = date("Asia/Manila")
	let result = await axios.get(`https://today.zenquotes.io/api/${time.getMonth() + 1}/${time.getDay()}`).then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Event of the day]: ${e}`)
		return null
	})
	return result
}

let quote = async () => {
	let result = await axios.get("https://zenquotes.io/api/today").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Quotes]: ${e}`)
		return null
	})
	return result[0]
}

module.exports = async (api) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let self = await api.getCurrentUserID()
	cronjob.schedule("0 0 * * *", () => {
		json.busylist = []
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
	},{
		schedule: true,
		timezone: "Asia/Manila"
	})
	cronjob.schedule("30 7 * * *", async () => {
		let q_data = await quote()
		let time = await today()
		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate() + 1
		if(day == 1 && month == 1){
			year += 1
		}
		let tlb = await gateway.dailyVerse(gateway.version.TAG_ANG_DATING_BIBLIYA_1905, [year, month, day])
		api.getThreadList(20, null, ['INBOX'], async (e, data) => {
			if(e) return console.error(`Error [Cron ThreadList]: ${e}`)
			let i = 0
			data.forEach(async (r) => {
				if(self != r.threadID && json.subscribe.includes(r.threadID) && i < 10 && !json.saga.includes(r.threadID)){
					let thread = await api.getThreadInfo(r.threadID)
					if(thread.isGroup){
						let message = `Good day ${thread.threadName}!!!\nBible verse of the day:\n`
						message += tlb[0].book + "\n" + tlb[0].verse + "\n\n"
						message += `Quotation of the day from ${q_data.a}\n~ ${q_data.q}\n\n`
						api.sendMessage(message, r.threadID, (e, m) => {
							afk(api, json)
						})
					}else{
						let user = await api.getUserInfo(r.threadID)
						let gender = g(user[r.threadID]['firstName'])['eng']
						let message = `Good day ${gender} ${user[r.threadID]['name']}!!!\nBible verse of the day:\n`
						message += tlb[0].book + "\n" + tlb[0].verse + "\n\n"
						message += `Quotation of the day from ${q_data.a}\n~ ${q_data.q}\n\n`
						api.sendMessage({
							body: message,
							mentions: [{
								id: r.threadID,
								tag: user[r.threadID]['name']
							}]
						}, r.threadID, (e, m) => {
							afk(api, json)
						})
					}
					i += 1
				}
			})
		})
	},{
		scheduled: true,
		timezone: "Asia/Manila"
	})
	cronjob.schedule("0 8 * * 7", () => {
		api.getThreadList(20, null, ['INBOX'], (e, data) => {
			if(e) return (`Error [Worship]: ${e}`)
			let i = 0
			data.forEach(r => {
				if(self != r.threadID && json.subscribe.includes(r.threadID) && i < 5 && !json.saga.includes(r.threadID)) {
					music(api, r.threadID)
				}
			})
		})
	},{
		scheduled: true,
		timezone: "Asia/Manila"
	})
	/*cronjob.schedule("17 0 * * *", () => {
		api.getThreadList(20, null, ['INBOX'], (e, data) => {
			if(e) return (`Error [New year]: ${e}`)
			let i = 0
			data.forEach(r => {
				if(self != r.threadID && !json.offcron.includes(r.threadID) && i < 5 && !json.saga.includes(r.threadID)) {
					pasko(api, r.threadID)
				}
			})
		})
		//pasko(api, 0)
	},{
		scheduled: true,
		timezone: "Asia/Manila"
	})*/
}
