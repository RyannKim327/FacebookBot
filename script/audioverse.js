const a = require("biblegateway-scrape")
const fs = require("fs")
const http = require("https")
const react = require("./../utils/react")

const afk = require("./../utils/afk")

module.exports = async (api, event, regex) => {
	let data = event.body.match(regex)[1]
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let b = await a.audio(data, a.audio_ver.KJV_DRAMATIZED)
	let c = await a.verse(data, a.version.ENG_KJV_21)
	let d = ""
	for(let i in c){
		console.log(c)
		d += `${c[i].book}\n${c[i].verse}`
	}
	let n = event.messageID.replace(/\./gi, "").replace(/\$/gi, "")
	let file = fs.createWriteStream(`temp/${n}.mp3`)
	if(b.resultCode == 200){
		http.get(b.mp3, r => {
			r.pipe(file)
			file.on("finish", async () => {
				api.sendMessage({
					body: `Audio Verse\n\n${d}`,
					attachment: fs.createReadStream(`${__dirname}/../temp/${n}.mp3`).on("end", async () => {
						if(fs.existsSync(`${__dirname}/../temp/${n}.mp3`)){
							fs.unlink(`${__dirname}/../temp/${n}.mp3`, (e) => {
								console.log("Deleted")
							})
						}
					})
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react(), event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
			})
		})
	}else{
		api.sendMessage("Something went wrong.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react(), event.messageID, (e) => {}, true)
			}
			afk(api, json)
		})
	}
}