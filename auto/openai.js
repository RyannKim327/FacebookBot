const axios = require("axios")

module.exports = async (api, event) => {
	let { data } = await axios.get(`https://gpt4-ni-kim.hiroshiapi.repl.co/gpt?ask=${event.body}`)
	api.sendMessage(data.response, event.threadID, (e, m) => {})
}