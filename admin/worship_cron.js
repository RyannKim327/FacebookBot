const worship = require("./../cron/music")

module.exports = async (api, event) => {
	api.setMessageReaction("⏳", event.messageID, (e) => {}, true)
	worship(api, event.theadID)
}