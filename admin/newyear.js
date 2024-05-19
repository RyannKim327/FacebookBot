const newyear = require("./../cron/newyear")

module.exports = async (api, event) => {
	api.setMessageReactionMqtt("⏳", event.messageID, (e) => {}, true)
	newyear(api, event.threadID)
}
