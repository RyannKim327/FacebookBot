const mekus = require("./../cron/remix_worship")

module.exports = async (api, event) => {
	api.setMessageReactionMqtt("⏳", event.messageID, (e) => {}, true)
	mekus(api, event.threadID)
}
