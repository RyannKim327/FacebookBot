const fs = require("fs")
module.exports = (api, json) => {
	let last = json.afkTime
	setTimeout(() => {
		json.isCalled = true
		json.afkTime = last
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
	}, 1000)
}