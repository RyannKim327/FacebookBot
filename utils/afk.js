const fs = require("fs")
module.exports = (api, json) => {
	let last = json.afkTime
	let called = json.isCalled
	setTimeout(() => {
		json.isCalled = called
		json.afkTime = last
		fs.writeFileSync("data/preferences.json", JSON.stringify(json), "utf8")
	}, 1000)
}