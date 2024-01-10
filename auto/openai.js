const axios = require("axios")

module.exports = async (api, event) => {
	let { data } = await axios.get(`https://hercai.onrender.com/turbo-16k/hercai?question=${encodeURI(event.body)}`)
	api.setMessageReaction("🤔", event.messageID, (e) => {}, true)
	api.sendTypingIndicator(event.threadID, (e) => {
		api.sendMessage(`‎ ${data.reply}`, event.threadID, (e, m) => {
			api.setMessageReaction("", event.messageID, (e) => {}, true)
		})
	})
}