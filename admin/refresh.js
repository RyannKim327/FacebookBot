const cp = require("child_process")

module.exports = async (api, event) => {
	api.sendMessage("Server refreshed", event.threadID, (e, m) => {})
	cp.fork("index.js")
}