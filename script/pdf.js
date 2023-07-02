const fs = require("fs")
const request = require("request")
const pdf = require("pdfdrive-ebook-scraper")
const afk = require("./../utils/afk")
const react = require("./../utils/react")

module.exports = async (api, event, regex) => {
	let data = event.body.match(regex)[1]
	let ebook = await pdf.findEbook(data)
	let dlBook = await pdf.getEbook(ebook[0].ebookUrl)
	let file = fs.createWriteStream(`temp/${data}.pdf`)
	let req = await request(dlBook.dlUrl)
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	req.pipe(file)
	file.on("finish", async () => {
		api.sendMessage({
			body: `Here's your requests ${dlBook.ebookName}`,
			attachment: fs.createReadStream(`${__dirname}/../temp/${data}.pdf`).on("end", async () => {
				if(fs.existsSync(`${__dirname}/../temp/${data}.pdf`)){
					fs.unlink(`${__dirname}/../temp/${data}.pdf`, (e) => {})
				}
			})
		}, event.threadID, (error, msg) => {
			if(error){
				console.error(`Error [PDF]: ${error}`)
				api.sendMessage(`Error [PDF]: ${error.errorSummary}`, event.threadID, (e, m) => {
					if(e){
						api.setMessageReaction(react, event.messageID, (e) => {}, true)
					}
					afk(api, json)
				})
			}
			afk(api, json)
		})
	})
}