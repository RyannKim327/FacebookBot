const fs = require("fs")
const axios = require("axios")
const http = require("https")
const afk = require("./../utils/afk")
const react = require("./../utils/react")
let whatIs = async (x) => {
	let o = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${x}`).then((response) => {
		return response.data[0]
	}).catch((err) => {
		return null //"Error 123 " + err.message
	})
	return o
}
module.exports = async (api, event, regex) => {
	let word = event.body.match(regex)[1]
	let info = await whatIs(word)
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let checker = []
	let au_msgs = []
	let files = []
	if(info == null){
		return api.sendMessage(`Can't find the word ${word}`, event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
			afk(api, json)
		})
	}
	let msg = `You've searched about the word "${info.word} ${info.phonetic ?? ""}"\n`
	let iterate = 0
	while(iterate < info.phonetics.length){
		if(info.phonetics[iterate] == undefined){
			return
		}else if(info.phonetics[iterate].text != undefined)
			msg += `${iterate + 1}: ${info.phonetics[iterate].text}\n`
		if(info.phonetics[iterate] == undefined && iterate < info.phonetics.length){
			continue
		}else if(info.phonetics[iterate].audio != "" && iterate < info.phonetics.length){
			let file = fs.createWriteStream(`temp/dictionary_${word}_${iterate}.mp3`)
			files.push(`temp/dictionary_${word}_${iterate}.mp3`)
			checker.push(true)
			let dumps = `Pronounce in audio\n`
			if(info.phonetics[iterate] != undefined){
				if(info.phonetics[iterate].text != undefined)
					dumps += `Phonetic: ${info.phonetics[iterate].text}\n`
				if(info.phonetics[iterate].license != undefined)
					dumps += `License: ${info.phonetics[iterate].license.name}`
			}
			au_msgs.push(dumps)
			await http.get(info.phonetics[iterate].audio, async (res) => {
				res.pipe(file)
				await file.on("finish", async (e) => {
					if(e) return console.error(`Error [Dictionary]: ${e}`)
				})
			})
		}
		iterate++
	}
	setTimeout(() => {
		for(let x = 0; x < files.length; x++){
			if(checker[x]){
				api.sendMessage({
					body: au_msgs[x],
					attachment: fs.createReadStream(`${__dirname}/../${files[x]}`).on("end", () => {
						if(fs.existsSync(`${__dirname}/../${files[x]}`)){
							setTimeout(() => {
								fs.unlink(`${__dirname}/../${files[x]}`, (e) => {})
							}, 1000)
						}
					})
				}, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
				checker[x] = false
			}
		}
	}, 1500)
	msg += `\n`
	if(info.origin != undefined){
		msg += `Origin: ${info.origin}\n`
	}
	msg += `\n`
	if(info.meanings != undefined){
		let means = info.meanings
		for(let j = 0; j < means.length; j++){
			msg += `Part of speech: ${means[j].partOfSpeech}\n`
			let def = means[j].definitions
			for(let k = 0; k < def.length; k++){
				let define = def[k]
				if(define.definition != undefined){
					msg += `[${k + 1}] ${define.definition}\n`
					if(define.example != undefined){
						msg += `Example: ${define.example}\n`
					}else{
						msg += `\n`
					}
				}
			}
			if(means[j].synonyms.length > 0){
				msg += `Synonyms:\n`
				for(let l = 0; l < means[j].synonyms.length; l++){
					msg += `${l + 1}: ${means[j].synonyms[l]}\n`
				}
				msg += `\n`
			}
			if(means[j].antonyms.length > 0){
				msg += `Antonyms:\n`
				for(let l = 0; l < means[j].antonyms.length; l++){
					msg += `${l + 1}: ${means[j].antonyms[l]}\n`
				}
				msg += `\n`
			}
		}
	}
	if(info.license.name)
		msg += `License: ${info.license.name}`
		api.sendMessage(msg, event.threadID, (e, m) => {
		if(e){
			api.setMessageReaction(react, event.messageID, (e) => {}, true)
		}
		afk(api, json)
	})
}