const mekus = require("./../cron/xmas")

module.exports = async (api, event) => {
	api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
	mekus(api, event.threadID)
}