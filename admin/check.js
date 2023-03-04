module.exports = (api, event) => {
	api.setMessageReaction("👍", event.messageID, (e) => {}, true)
	setTimeout((e) => {
		api.setMessageReaction("", event.messageID, (e) => {}, true)
	}, 15000)
}