const axios = require("axios")
const logs = require("./../utils/logs")
module.exports = async (api, event) => {
	let { data } = await axios.get(`https://haze-gemini-v-8ba147453283.herokuapp.com/gemini-vision?text=${encodeURI(event.body)}`).catch(error => {
		logs(`Error: ${JSON.stringify(error)}`)
		return {
			data: "Something went wrong"
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
