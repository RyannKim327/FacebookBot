const fs = require("fs")
const tug = require("ultimate-guitar")
const afk = require("afk")
const react = require("./../utils/react")

let s1 = async (title) => {
	let data = await tug.firstData(title).then(r => {
		return r
	}).catch((e) => {
		console.error(e)
		return ""
	})
	//console.log(data)
	return data
}

let s2 = async (title) => {
	let data = await tug.randomData(title)
	return data
}

module.exports = async (api, event, regex) => {
	let x = event.body.match(regex)[1]
	let y = await s2(x)
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	api.sendMessage(`Title: ${y.title}\nArtist: ${y.artist}\nKey: ${y.key}\n\n${y.chords}`, event.threadID, (e, m) => {
		if(e){
			api.setMessageReaction(react, event.messageID, (e) => {}, true)
		}
		afk(api, json)
	})
}