const axios = require("axios")

module.exports = async (api, event) => {
	let { data } = await axios.get(`https://haze-gemini-v-8ba147453283.herokuapp.com/gemini-vision?text=${encodeURI(event.body)}`).catch(error => {
		return {
			data: error
		}
	})
	api.setMessageReactionMqtt("🤔", event.messageID, (e) => {
		if(e) console.error(JSON.stringify(e, null, 2))
	}, true)
	api.sendTypingIndicator(event.threadID, (e) => {
		api.sendMessage(`‎ ${data.response}`, event.threadID, (e, m) => {
			api.setMessageReactionMqtt("", event.messageID, (e) => {}, true)
		})
	})
}
