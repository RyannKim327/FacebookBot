const axios = require("axios")
const fs = require("fs")
const request = require("request")
const react = require("./../utils/react")

let search = async (_data) => {
	let { data } = await axios.get(`https://lexica.art/api/v1/search?q=${_data}`)
	return data
}

module.exports = async (api, event, regex) => {
	let data = event.body.match(regex)[1]
	let s = await search(data)
	let img = s.images[Math.floor(Math.random() * s.images.length)]
	let file = fs.createWriteStream(`temp/${event.senderID}.jpg`)
	console.log(img)
	let r = request.get(img.src)
	r.pipe(file)
	r.on("end", () => {
		api.sendMessage({
			body: `Here's your image requested.\n\n- ${img.prompt}`,
			attachment: fs.createReadStream(`${__dirname}/../temp/${event.senderID}.jpg`).on("end", () => {
				if(fs.existsSync(`${__dirname}/../temp/${event.senderID}.jpg`)){
					fs.unlink(`${__dirname}/../temp/${event.senderID}.jpg`, (e) => {})
				}
			})
		}, event.threadID, (e, m) => {
			if(e){
				api.setMessageReaction(react(), event.messageID, (e) => {}, true)
			}
		})
	})
}