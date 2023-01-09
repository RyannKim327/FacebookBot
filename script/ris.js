const google = require("googlethis")

let ris = async (img) => {
	let result = await google.search(img, {
		ris: true,
		safe: true
	})
	return result
}

module.exports = async (api, event) => {
	if(event.messageReply.attachments[0].type == "photo"){
		let res = await ris(encodeURIComponent(event.messageReply.attachments[0].url))
		console.log(res)
	}
}