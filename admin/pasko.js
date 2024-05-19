const mekus = require("./../cron/xmas")

module.exports = async (api, event) => {
	api.setMessageReactionMqtt("⏳", event.messageID, (e) => {}, true)
	mekus(api, event.threadID)
}
