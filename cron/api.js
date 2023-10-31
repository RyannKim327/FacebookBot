const axios = require("axios")
const fs = require("fs")
const http = require("https")
const cron = require("node-cron")
const afk = require("./../utils/afk")
const g = require("./../utils/gender")

let quote = async () => {
	let result = await axios.get("https://zenquotes.io/api/quotes").then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios Quotes]: ${e}`)
		return null
	})
	return result
}

module.exports = async (api) => {
	cron.schedule("30 18 * * *", async () => {
		let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		let quotes = await quote()
		let self = await api.getCurrentUserID()
		api.getThreadList(20, null, ['INBOX'], async (error, data) => {
			let sent = 7
			data.forEach(async (r) => {
				let timer = Math.floor(Math.random() * 60000)
				if(r.threadID != self && json.subscribe.includes(r.threadID) && !json.saga.includes(r.threadID) && sent > 0){
					let file = fs.createWriteStream(`temp/${r.threadID}_quotes.jpg`)
					let thread = await api.getThreadInfo(r.threadID)
					http.get("https://zenquotes.io/api/image", async (rq) => {
						rq.pipe(file)
						file.on("finish", async () => {
							if(thread.isGroup){
								setTimeout(() => {
									api.sendMessage({
										body: `A random quotation for ${thread.threadName}.`,
										attachment: fs.createReadStream(`${__dirname}/../temp/${r.threadID}_quotes.jpg`).on("end", () => {
											if(fs.existsSync(`${__dirname}/../temp/${r.threadID}_quotes.jpg`)){
												fs.unlink(`${__dirname}/../temp/${r.threadID}_quotes.jpg`, (e) => {})
											}
										})
									}, r.threadID, (e, m) => {
										afk(api, json)
									})
								}, timer)
							}else{
								let user = await api.getUserInfo(r.threadID)
								let gender = g(user[r.threadID]['firstName'])['eng']
								setTimeout(() => {
									api.sendMessage({
										body: `A random quotation for you ${gender} ${user[r.threadID]['name']}.`,
										mentions: [{
											id: r.threadID,
											tag: user[r.threadID]['name']
										}],
										attachment: fs.createReadStream(`${__dirname}/../temp/${r.threadID}_quotes.jpg`).on("end", () => {
											if(fs.existsSync(`${__dirname}/../temp/${r.threadID}_quotes.jpg`)){
												fs.unlink(`${__dirname}/../temp/${r.threadID}_quotes.jpg`, (e) => {})
											}
										})
									}, r.threadID, (e, m) => {
										afk(api, json)
									})
								}, timer)
							}
						})
					})
				}
				sent -= 1
			})
		})
	},{
		timezone: "Asia/Manila",
		scheduled: true
	})
}

