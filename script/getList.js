module.exports = async (api, event) => {
	api.getThreadList(20, null, ['INBOX'], (err, data) => {
		console.error(err)
		let lists = []
		for(let i = 0; i < data.length; i++){
			api.sendMessage(lists.join(", "), data[i].threadID, (err, m) => {
				console.error(err)
			})
		}
		console.log(lists)
	})
}