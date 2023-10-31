const fs = require("fs")
const afk = require("./../utils/afk")
const { getPrefix } = require("./../config")
const manila = require("manilatimes-scrape")
const react = require("./../utils/react")

module.exports = async (api, event, regex) => {
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	if(event.body.match(regex)[1] == undefined){
		let today = await manila.todayNews()
		let message = `Please copy the link of the news article and message it like this: ${getPrefix()}news <url here>\n\nArticle Lists`
		for(let r = 0; r < today.length; r++){
			message += `Title: ${today[r].title}\nURL: ${today[r].url}\n\n`
		}
		console.log(today[0])
		api.sendMessage(message, event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react, event.messageID, (e) => {}, true)
			}
			afk(api, json)
		})
	}else{
		try{
			let news = await manila.article(event.body.match(regex)[1])
			api.sendMessage(`Title: ${news.title}\n- ${news.author}\n[${news.date}]\n\n${news.body.join("\n\n")}`, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
		}catch(e){
			api.sendMessage(`There's an error happens.`, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
		}
	}
}