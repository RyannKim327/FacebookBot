const http = require("https")
const google = require("googlethis")
const fs = require("fs")
const afk = require("./../utils/afk")
const react = require("./../utils/react")

let search = async (info) => {
	let data = await google.search(info, {
		safe: true,
		additional_parameters: {
			hl: "en"
		}
	}).then(r => {
		return r
	}).catch(e => {
		console.error(`Error [Google Search]: ${e}`)
		return null
	})
	return data
}

module.exports = async (api, event, regex) => {
	let body = event.body.match(regex)
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	api.setMessageReaction("🔎", event.messageID, (e) => {}, true)
	let data = await search(body[1])
	console.log(data)
	if(data == null){
		api.sendMessage("An error occured. Please try again later.", event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
			afk(api, json)
		})
		api.setMessageReaction("", event.messageID, (e) => {}, true)
	}else{
		if(data.did_you_mean){
			api.sendMessage(`Did you mean: ${data.did_you_mean}.`, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
		}	
		if(data.knowledge_panel.title != null && data.knowledge_panel.lyrics == null){
			let a = data.knowledge_panel
			let objs = Object.keys(a)
			let message = `${a.title}`
			if(a.type != undefined || a.type != null)
				message += ` - ${a.type}`
			message += "\n\n"
			if(a.description != null)
				message += `~ ${a.description}\n`
			if(data.featured_snippet.description != null)
				message += `~ ${data.featured_snippet.description}\n`
			message += "\n"
			objs.forEach(r => {
				let key = r.replace(/_/gi, " ").toUpperCase()
				if(r != "title" && r != "type" && r != "description" && r != "url" && r != "images" && r != "lyrics"){
					if(Array.isArray(a[r])){
						message += `${key}:\n`
						let number = 1
						let rate = a[r]
						for(let i in rate){
							let keys = Object.keys(rate[i])
							keys.forEach(s => {
								if(rate[i][s] != null && rate[i][s].length > 0){
									if(s.toLowerCase() != "icon"){
										message += `  * ${s.toUpperCase()} - ${rate[i][s]}\n`
									}
								}
								number++
							})
						}
					}else{
						message += `${key}: ${a[r]}\n`
					}
				}
			})
			if(a.url != undefined || a.url != null){
				message += `\nSource: ${a.url}`
			}
			let sendMsg = {
				body: message
			}
			if(a.images.length > 0){
				let num = 1
				if(a.images[0].url != null){
					let name = `image_${num}.jpg`
					let dir = `${__dirname}/../temp/${name}`
					let file = fs.createWriteStream("temp/" + name)
					http.get(a.images[0].url, r => {
						r.pipe(file)
						file.on("finish", () => {
							api.sendMessage({
								body: message,
								attachment: fs.createReadStream(dir).on("end", () => {
									if(fs.existsSync(dir)){
										fs.unlink(dir, (e) => {})
									}
								})
							}, event.threadID, (e, m) => {
								if(e) return api.sendMessage(e, event.threadID, (e, m) => {
									afk(api, json)
								})
								afk(api, json)
							})
						})
					})
				}
			}else{
				api.sendMessage(sendMsg, event.threadID, (e, m) => {
					if(e) return api.sendMessage(e, event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react, event.messageID, (e) => {}, true)
						}
						afk(api, json)
					})
					afk(api, json)
				})
			}
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}else if(data.knowledge_panel.lyrics != null){
			let a = data.knowledge_panel
			let by = ""
			if(a.type != null)
				by = a.type.match(/Song\sby\s([\w\W]+)/)[1]
			let message = `Title: ${a.title} - ${by}\n\n${a.lyrics}`
			api.sendMessage(message, event.threadID, (e, m) => {
				if(e) return api.sendMessage(e, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
				afk(api, json)
			})
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}else if(data.featured_snippet.title != null && data.featured_snippet.description != null){
			let a = data.featured_snippet
			let message = `${a.title}\n~ ${a.description}`
			if(a.url != undefined || a.url != null){
				message += `\n${a.url}`
			}
			api.sendMessage(message, event.threadID, (e, m) => {
				if(e) return api.sendMessage(e, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
				afk(api, json)
			})
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}else if(data.translation.source_text != null){
			let a = data.translation
			api.sendMessage(`Original Text: ${a.source_text}\nTranslated: ${a.target_text}\n\nTranslated: ${a.source_language} - ${a.target_language}`, event.threadID, (e, m) => {
				if(e) return api.sendMessage(e, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
				afk(api, json)
			})
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}else if(data.dictionary.word != null){
			let a = data.dictionary
			let message = a.word + "\n" + a.phonetic + "\n\nDefinitions\n"
			let i = 1
			a.definitions.forEach(r => {
				message += i + ". " + r + "\n"
				i++
			})
			message += "\n"
			i = 1
			if(a.examples.length > 0){
				message += "Examples:\n"
				a.examples.forEach(r => {
					message += i + ". " + r + "\n"
					i++
				})
			}
			if(a.audio != null){
				let name = `${__dirname}/../temp/${a.word}_${event.threadID}.mp3`
				let file = fs.createWriteStream(`temp/${a.word}_${event.threadID}.mp3`)
				http.get(a.audio, (r) => {
					r.pipe(file)
					file.on("finish", () => {
						api.sendMessage({
							body: message,
							attachment: fs.createReadStream(name).on("end", async  () => {
								if(fs.existsSync(name)){
									fs.unlink(name, (e) => {
										if(e) return console.error(`Error [Google Dictionary]: ${e}`)
									})
								}
							})
						}, event.threadID, (e, m) => {
							if(e) return api.sendMessage(e, event.threadID, (e, m) => {
								if(e){
									api.setMessageReaction(react, event.messageID, (e) => {}, true)
								}
								afk(api, json)
							})
							afk(api, json)
						})
					})
				})
			}else{
				api.sendMessage(message, event.threadID, (e, m) => {
					if(e) return api.sendMessage(e, event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react, event.messageID, (e) => {}, true)
						}
						afk(api, json)
					})
					afk(api, json)
				})
			}
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}else if(data.unit_converter.input != null){
			let a = data.unit_converter
			api.sendMessage(`Input: ${a.input}\nOutput: ${a.output}\n\nFormula ${a.formula}`, event.threadID, (e, m) => {
				if(e) return api.sendMessage(e, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
				afk(api, json)
			})
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}else if(data.weather.location != null){
			let a = data.weather
			api.sendMessage(`Location: ${a.location}\nForecast: ${a.forecast}\nPrecipitation: ${a.precipitation}\nHumidity: ${a.humidity}\nTemperature: ${a.temperature}\nWind speed: ${a.wind}`, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}else{
			if(data.results.length > 0){
				let a = data.results.OrganicResult
				let b = []
				let message = ""
				for(let c = 0; c < 3 && c < a.length; c++){
					let d = Math.floor(Math.random() * a.length)
					if(b.includes(d)){
						c--
					}else{
						b[c] = d
					}
				}
				let i = 1
				for(let c = 0; c < b.length; c++){
					if(a[b[c]].title != undefined || a[b[c]] != undefined){
						message += `${i}. ${a[b[c]].title}\n~ ${a[b[c]].description}\nSource: ${a[b[c]].url.replace(/\./gi,"(dot)")}\n\n`
						i++
					}
				}
				api.sendMessage(message, event.threadID, (e, m) => {
					if(e) return api.sendMessage(e, event.threadID, (e, m) => {
						if(e){
							api.setMessageReaction(react, event.messageID, (e) => {}, true)
						}
						afk(api, json)
					})
					afk(api, json)
				})
			}else{
				api.sendMessage("There's no results found, might have server error. Please try again later.", event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
			}
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		}
	}
}
