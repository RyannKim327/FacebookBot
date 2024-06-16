const fs = require("fs")
module.exports = (text) => {
	// TODO: To filter the texts to avoid facebook violations and misbehaviour
	// This may help to prevent the hate speech that uses may done.
	// INFO: This function return to a boolean which is negated with. If there's no badwords detected, it returns to true
	let data = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let reg = new RegExp(data.badwords.join("\\b|"), "i")
	return !reg.test(text)
}
