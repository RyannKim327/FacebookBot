const a = require("biblegateway-scrape")
const fs = require("fs")
const http = require("https")
const react = require("./../utils/react")
const g = require("./../utils/gender")
const afk = require("./../utils/afk")

module.exports = async (api, event, regex) => {
	let data = event.body.match(regex)[1]
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let b = await a.audio(data, a.audio_ver.KJV_DRAMATIZED)
	let c = await a.verse(data, a.version.version.V)
	let d = ""
	for(let i in c){
		d += `${c[i].book}\n${c[i].verse}`
	}
	let n = event.messageID.replace(/\./gi, "").replace(/\$/gi, "")
	let file = fs.createWriteStream(`temp/${n}.mp3`)
	d += `\n\n${b.copyright}`
	if(b.resultCode == 200){
		let user = await api.getUserInfo(event.senderID)
		let fname = user[event.senderID]['name']
		let gender = g(user[event.senderID]['firstName'])['eng']
		http.get(b.mp3, r => {
			r.pipe(file)
			file.on("finish", async () => {
				api.sendMessage({
					body: `Here's your audio verse ${gender} ${fname}\n\n${d}`,
					mentions: [{
						id: event.senderID,
						tag: fname
					}],
					attachment: fs.createReadStream(`${__dirname}/../temp/${n}.mp3`).on("end", async () => {
						if(fs.existsSync(`${__dirname}/../temp/${n}.mp3`)){
							fs.unlink(`${__dirname}/../temp/${n}.mp3`, (e) => {
								console.log("Deleted")
							})
						}
					})
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
			})
		})
	}else{
		api.sendMessage("Something went wrong.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
			afk(api, json)
		})
	}
}