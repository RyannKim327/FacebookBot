const axios = require("axios")
const fs = require("fs")
const afk = require("./../utils/afk")
const gender = require("./../utils/gender")
const react = require("./../utils/react")

let result = async (str) => {
	let data = await axios.get("https://api-baybayin-transliterator.vercel.app/?text=" + str).then(r => {
		return r.data
	}).catch(e => {
		console.error(`Error [Axios baybayin]: ${e}`)
		return null
	})
	return data
}

module.exports = async (api, event, regex) => {
	let _regex = event.body.match(regex)
	let data = await result(_regex[1])
	let userID = event.senderID
	let user = await api.getUserInfo(userID)
	let name = user[userID].name
	let fname = user[userID].firstName
	let g = gender(fname)['eng']
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	api.sendMessage({
		body: `The text "${_regex[1]}" in baybayin ${g} ${name} is "${data.baybay}".`,
		mentions: [{
			id: userID,
			tag: name
		}]
	}, event.threadID, (e, m) => {
		if(e){
			api.setMessageReactionMqtt(react, event.messageID, (e) => {}, true)
		}
		afk(api, json)
	})
}
