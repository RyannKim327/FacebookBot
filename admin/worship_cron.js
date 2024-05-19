const worship = require("./../cron/music")

module.exports = async (api, event) => {
	api.setMessageReactionMqtt("⏳", event.messageID, (e) => {}, true)
	worship(api, event.threadID)
}
