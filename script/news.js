const { getPrefix } = require("./../config")
const mt = require("manilatimes-scrape")
const react = require("./../utils/react")

module.exports = async (api, event, regex) => {
	if(event.body.match(regex)[1] == undefined){
		mt.todayNews().then(today => {
			let message = `Please copy the link of the news article and message it like this: ${getPrefix()}news <url here>\n\nArticle Lists`
			for(let r in today){
				message += `Title: ${today[r].title}\nURL: ${today[r].url}\n\n`
			}
			console.log(today)
			api.sendMessage(message, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react(), event.messageID, (e) => {}, true)
				}
			})
		}).catch(e => {
			console.error(e)
		})
	}else{
		try{
			let news = await mt.article(event.body.match(regex)[1])
			api.sendMessage(`Title: ${news.title}\n- ${news.author}\n[${news.date}]\n\n${news.body.join("\n\n")}`, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react(), event.messageID, (e) => {}, true)
				}
			})
		}catch(e){
			api.sendMessage(`There's an error happens.`, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react(), event.messageID, (e) => {}, true)
				}
			})
		}
	}
}