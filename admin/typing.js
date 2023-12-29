module.exports = (api, event) => {
	let i = 5
	setInterval(async () => {
		if(i > 0){
			await api.sendTypingIndicator(event.threadID, (e) => {
				console.log(e.message)
			})
		}
	})
}