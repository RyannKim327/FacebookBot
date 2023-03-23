const fs = require("fs")
module.exports = (text) => {
	let data = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let reg = new RegExp(data.badwords.join("\\b|"), "i")
	return !reg.test(text)
}