const { exec } = require("child_process")

module.exports = async (api, event) => {
	if(exec("rs")){
		api.sendMessage("Server refreshed", event.threadID, (e, m) => {})
	}
}