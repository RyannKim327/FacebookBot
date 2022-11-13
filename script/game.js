const { commands, getPrefix } = require("./../config")

module.exports = (api, event) => {
	let message += "Game Commands:\n"
	i = 1
	commands.forEach(r => {
		let data = r.data
		let show = true
		if(data.show != undefined)
			show = data.show
		if(!data.admin && show && data.game && data.game != undefined){
			message += i + ". " + data.title + "\n~ " + data.description + "\n"
			let j = 1
			data.commands.sort()
			data.commands.forEach(q => {
				j += 1
				message += j + ". " + getPrefix() + q.replace(/(\(\[\\w\\W\]\+\))/gi, "<data>").replace(/(\(\[\\w\]\+\))/gi, "<data>").replace(/(\\s)/gi, " ").replace(/(\$)/gi, "").replace(/(\(\[\\d\]\+\))/gi, "<data>") + "\n"
			})
			message += "\n"
			i += 1
		}
	})
	api.sendMessage(message, event.threadID)
}
