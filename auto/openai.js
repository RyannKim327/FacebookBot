const axios = require("axios")

module.exports = async (api, event) => {
	let { data } = await axios.get(`https://gpt4-ni-kim.hiroshiapi.repl.co/gpt?ask=${encodeURI(event.body)}`)
	api.setMessageReaction("🤔", event.messageID, (e) => {}, true)
	api.sendTypingIndicator(event.threadID, (e) => {
		api.sendMessage(data.response, event.threadID, (e, m) => {
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		})
	})
}