const axios = require("axios")
const fs = require("fs")
const http = require("https")
const cron = require("node-cron")
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
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	cron.schedule("30 18 * * *", async () => {
		let quotes = await quote()
		let self = await api.getCurrentUserID()
		api.getThreadList(20, null, ['INBOX'], async (error, data) => {
			let sent = 7
			data.forEach(async (r) => {
				if(r.threadID != self && json.subscribe.includes(r.threadID) && !json.saga.includes(r.threadID) && sent > 0){
					/*let n = Math.floor(Math.random() * quotes.length)
					let q = quotes[n]
					let thread = await api.getThreadInfo(r.threadID)
					if(thread.isGroup){
						api.sendMessage(`A random quotation for ${thread.threadName}.\n\n  ${q.q}\n~${q.a}`, r.threadID, (e, m) => {})
					}else{
						let user = await api.getUserInfo(r.threadID)
						let gender = g(user[r.threadID]['firstName'])['eng']
						api.sendMessage({
							body: `A random quotation for you ${gender} ${user[r.threadID]['name']}.\n\n  ${q.q}\n~${q.a}`,
							mentions: [{
								id: r.threadID,
								tag: user[r.threadID]['name']
							}]
						}, r.threadID, (e, m) => {})
					}*/
					let file = fs.createWriteStream(`temp/${r.threadID}_quotes.jpg`)
					let thread = await api.getThreadInfo(r.threadID)
					http.get("https://zenquotes.io/api/image", async (rq) => {
						rq.pipe(file)
						file.on("finish", async () => {
							if(thread.isGroup){
								api.sendMessage({
									body: `A random quotation for ${thread.threadName}.`,
									attachment: fs.createReadStream(`${__dirname}/../temp/${r.threadID}_quotes.jpg`).on("end", () => {
										if(fs.existsSync(`${__dirname}/../temp/${r.threadID}_quotes.jpg`)){
											fs.unlink(`${__dirname}/../temp/${r.threadID}_quotes.jpg`, (e) => {})
										}
									})
								}, r.threadID, (e, m) => {})
							}else{
								let user = await api.getUserInfo(r.threadID)
								let gender = g(user[r.threadID]['firstName'])['eng']
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
								}, r.threadID, (e, m) => {})
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

