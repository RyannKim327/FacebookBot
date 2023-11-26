const worship = require("./../cron/")

module.exports = async (api, event) => {
	api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
	worship(api, event.threadID)
}