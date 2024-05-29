const logs = require("./../utils/logs")
module.exports = (api, event) => {
	let i = 5
	setInterval(async () => {
		if(i > 0){
			await api.sendTypingIndicatorMqtt(event.threadID, (e) => {
				logs(e.message)
				i--
			})
		}
	})
}
