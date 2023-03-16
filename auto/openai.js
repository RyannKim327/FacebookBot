const { Configuration, OpenAIApi } = require("openai")
const react = require("./../utils/react")

let config = async (str) => {
	let configurations = new Configuration({
		"apiKey": process.env['openai']
	})
	let openai = new OpenAIApi(configurations)
	/*let { data } = await openai.createCompletion({
		prompt: str,
		model: "text-davinci-003",
		temperature: 0.5,
		max_tokens: 4000,
		top_p: 0.3,
		frequency_penalty: 0.5,
		presence_penalty: 0.0,
		user: "Kim"
	})*/
	let { data } = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		temperature: 0.5,
		max_tokens: 4000,
		top_p: 0.3,
		frequency_penalty: 0.5,
		presence_penalty: 0.0,
		user: "Kim",
		messages: [{
			role: "user",
			content: str
		}]
	})
	return data
}

module.exports = async (api, event) => {
	let body = event.body
	if(body.split(" ").length > 1){
		let ai = await config(body)
		let msg = ai.choices[0].message.content.shift("\n")
		while(msg[0] == ""){
			msg.shift()
		}
		api.sendMessage("⠀" + msg.join("\n"), event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react(), event.messageID, (e) => {}, true)
			}
		})
	}
}
