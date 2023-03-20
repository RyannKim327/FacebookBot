const fs = require("fs")
const a = require("biblegateway-scrape")
const afk = require("./../utils/afk")
const react = require("./../utils/react")

module.exports = async (api, event, regex) => {
	let reg = event.body.match(regex)[1]
	let data = await a.verse(reg, a.version.TAG_ANG_DATING_BIBLIYA_1905)
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let book = ""
	for(let i in data){
		book += `${data[i].book}\n${data[i].verse}`
	}
	api.sendMessage({
		body:  `Ang Dating Bibliya 1905:\n\n${book} `
	}, event.threadID, (e) => {
		if(e){
			api.sendMessage({
				body: "Ang Dating Bibliya 1905:\n\n- Sa sobrang haba kapatid, ay hindi kinaya ni messenger. Ipagpaumanhin."
			}, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react(), event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
		}
		afk(api, json)
	})
}