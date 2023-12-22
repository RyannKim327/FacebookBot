const mekus = require("./../cron/remix_worship")

module.exports = async (api, event) => {
	api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
	mekus(api, event.threadID)
}