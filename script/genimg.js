const { Configuration, OpenAIApi } = require("openai")
const fs = require("fs")
const http = require("https")

let config = async (str) => {
	let configurations = new Configuration({
		"apiKey": process.env['openai']
	})
	let openai = new OpenAIApi(configurations)
	let { data } = await openai.createImage({
		prompt: str,
		n: 1,
		size: "1024x1024"
	})
	return data
}

module.exports = async (api, event, regex) => {
	let x = event.body.match(regex)[1]
	console.log(x)
	let y = await config(x)
	let f = fs.createWriteStream(`temp/ai.jpg`)
	api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
	http.get(y.data[0].url, r => {
		r.pipe(f)
		f.on("finish", () => {
			api.sendMessage({
				body: "Generated Image",
				attachment: fs.createReadStream(`${__dirname}/../temp/ai.jpg`).on("end", () => {
					fs.unlink(`${__dirname}/../temp/ai.jpg`, (e) => {
						api.setMessageReaction("", event.messageID, (e) => {}, true)
					})
				})
			}, event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction("✨", event.messageID, (e) => {}, true)
				}
			})
		})
	})
	api.setMessageReaction("", event.messageID, (e) => {}, true)
}