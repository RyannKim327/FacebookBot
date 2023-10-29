const fs = require("fs")
const a = require("biblegateway-scrape")
const afk = require("./../utils/afk")
const g = require("./../utils/gender")
const react = require("./../utils/react")

module.exports = async (api, event, regex) => {
	let reg = event.body.match(regex)
	let lists = {
		"1905": a.version.TAG_ANG_DATING_BIBLIYA_1905,
		"1978": a.version.TAG_ANG_BIBLIA_1978,
		"2001": a.version.TAG_ANG_BIBLIA_2001,
		"snd": a.version.TAG_ANG_SALITA_NG_DIYOS,
		"niv": a.version.ENG_NEW_INTERNATIONAL_VERSION,
		"esv": a.version.ENG_ENLISH_STANDARD_VERSION,
		"kjv": a.version.ENG_KING_JAMES_VERSION,
		"nlt": a.version.ENG_NEW_LIVING_TRANSLATION,
		"b1905": a.version.BAYBAYIN_ANG_DATING_BIBLIYA_1905,
		"b1978": a.version.BAYBAYIN_ANG_BIBLIA_1978,
		"b2001": a.version.BAYBAYIN_ANG_BIBLIA_2001,
		"bsnd": a.version.BAYBAYIN_ANG_SALITA_NG_DIYOS
	}
	let lists_version = {
		"1905": "ANG DATING BIBLIYA 1905",
		"1978": "ANG BIBLIA 1978",
		"2001": "ANG BIBLIA 2001",
		"snd": "ANG SALITA NG DIYOS",
		"niv": "NEW INTERNATIONAL VERSION",
		"esv": "ENGLISH STANDARD VERSION",
		"kjv": "KING JAMES VERSION",
		"nlt": "NEW LIVING TRANSLATION",
		"b1905": "ANG DATING BIBLIYA 1905 (Baybayin)",
		"b1978": "ANG BIBLIA 1978 (Baybayin)",
		"b2001": "ANG BIBLIA 2001 (Baybayin)",
		"bsnd": "ANG SALITA NG DIYOS (Baybayin)"
	}
	let tag = ["1905", "1978", "2001", "snd"]
	let baybay = ["b1905", "b1978", "b2001", "bsnd"]
	let version = a.version.TAG_ANG_DATING_BIBLIYA_1905
	let verse = reg[1]
	let ver = "1905"
	if(Object.keys(lists).includes(reg[1])){
		version = lists[reg[1]]
		verse = reg[2]
		ver = reg[1]
	}
	let lang = tag.includes(ver) ? "tag" : "eng"
	try{
		let data = await a.verse(verse, version)
		let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
		let user = await api.getUserInfo(event.senderID)
		let gender = g(user[event.senderID]['firstName'])[lang]
		let book = (lang == "tag") ? `Ito ang talata sa bibliya na iyong hinihiling ${gender} ${user[event.senderID]['name']} mula sa ${lists_version[ver]}:` : `Here's the bible verse you've requested ${gender} ${user[event.senderID]['name']} from ${lists_version[ver]}:`
		for(let i in data){
			book += `\n${data[i].book}\n${data[i].verse}`
		}
		if(book == ""){
			api.sendMessage("Kindly check the spelling of your request verse.", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
		}else{
			api.sendMessage({
				body:  `${book}`,
				mentions: [{
					id: event.senderID,
					tag: user[event.senderID]['name']
				}]
			}, event.threadID, (e, m) => {
				if(e){
					api.sendMessage({
						body: "Error:\n\n- The text are too much long, so that messenger declined to send the verse"
					}, event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react, event.messageID, (e) => {}, true)
						}
						afk(api, json)
					})
				}
				afk(api, json)
			})
		}
	}catch(e){
		api.sendMessage(e.messgae)
	}
}