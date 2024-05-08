const fs = require("fs")
const request = require("request")

module.exports = async (api, event, regex) => {
	let message = ""
	if(event.type == "message_reply"){
		api.getUserInfo(event.messageReply.senderID, async (err, data) => {
			if(err){
				console.log(err)
				api.sendMessage("Error occured", event.threadID, event.messageID)
			}else{
				let d = data[event.messageReply.senderID]
				let gender = ""
				switch(d.gender){
					case 1:
						gender = "Female"
					break
					case 2:
						gender = "Male"
					break
					default:
						gender = "Custom"
				}
				let file = fs.createWriteStream("temp/dp.jpg")
				message += "Name: " + d.name + "\n"
				if(d.vanity != undefined || d.vanity != null || d.vanity != ""){
					message += "Username: " + d.vanity + "\n"
				}
				message += "Facebook ID: " + event.messageReply.senderID + "\n"
				message += "Gender: " + gender + "\n"
				message += "Profile Link: " + d.profileUrl
				let r = request(encodeURI(`https://graph.facebook.com/${event.messageReply.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
				r.pipe(file)
				file.on("close", () => {
					api.sendMessage({
						body: message,
						attachment: fs.createReadStream(__dirname + "/../temp/dp.jpg").on("end", async () => {
							fs.unlink(__dirname + "/../temp/dp.jpg", (err) => {})
						})
					}, event.threadID, event.messageID)
				})
			}
		})
	}else{
		let info = event.body.match(regex)
		if(Object.keys(event.mentions).length > 0){
			let mention = Object.keys(event.mentions)[0]
			api.getUserInfo(mention, async (err, data) => {
				if(err){
					console.log(err)
					api.sendMessage("Error occured [Mention]", event.threadID, event.messageID)
				}else{
					let d = data[mention]
					let gender = ""
					switch(d.gender){
						case 1:
							gender = "Female"
						break
						case 2:
							gender = "Male"
						break
						default:
							gender = "Custom"
					}
					let file = fs.createWriteStream("temp/dp.jpg")
					message += "Name: " + d.name + "\n"
					if(d.vanity != undefined || d.vanity != null || d.vanity != ""){
						message += "Username: " + d.vanity + "\n"	
					}
					message += "Facebook ID: " + mention + "\n"
					message += "Gender: " + gender + "\n"
					message += "Profile Link: " + d.profileUrl
					let r = request(encodeURI(`https://graph.facebook.com/${mention}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
					r.pipe(file)
					file.on("close", () => {
						api.sendMessage({
							body: message,
							attachment: fs.createReadStream(__dirname + "/../temp/dp.jpg").on("end", async () => {
								fs.unlink(__dirname + "/../temp/dp.jpg", (err) => {})
							})
						}, event.threadID, event.messageID)
					})//api.sendMessage(message, event.threadID, event.messageID)
				}
			})
		}else{
			try{
				api.getUserInfo(parseInt(info[1]), async (err, data) => {
					let d = null
					try{
						d = data[info[1]]
					}catch(e){
						// console.log(err)
						// api.sendMessage("Error occured. either not found, deleted or deactivated.", event.threadID, event.messageID)
						d = api.getUserID(info[1], (err, d1) => {
							if(err) console.error(`Error [FB]: ${JSON.stringify(err, null, 2)}`)
							let x = 0
							while(d1[x].type != "user"){
								x++
							}
							return d1[x].userID
						})
					}
					let gender = ""
					switch(d.gender){
						case 1:
							gender = "Female"
						break
						case 2:
							gender = "Male"
						break
						default:
							gender = "Custom"
					}
					let file = fs.createWriteStream("temp/dp.jpg")
					message += "Name: " + d.name + "\n"
					if(d.vanity != undefined || d.vanity != null || d.vanity != ""){
						message += "Username: " + d.vanity + "\n"	
					}
					message += "Facebook ID: " + info[1] + "\n"
					message += "Gender: " + gender + "\n"
					message += "Profile Link: " + d.profileUrl
					let r = request(encodeURI(`https://graph.facebook.com/${info[1]}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
					r.pipe(file)
					file.on("close", () => {
						api.sendMessage({
							body: message,
							attachment: fs.createReadStream(__dirname + "/../temp/dp.jpg").on("end", async () => {
								fs.unlink(__dirname + "/../temp/dp.jpg", (err) => {})
							})
						}, event.threadID, event.messageID)
					})
				})
			}catch(e){
				console.log(e)
				api.getUserID(info[1], (err, obj) => {
					if(err){
						console.log(err)
						api.sendMessage("Error occured, either not found, deleted or deactivated", event.threadID, event.messageID)
					}else{
						let iter = 0
						while(obj[iter].type != "user"){
							iter++
						}
						api.getUserInfo(obj[iter].userID, async (err, data) => {
							let d = data[obj[iter].userID]
							let gender = ""
							switch(d.gender){
								case 1:
									gender = "Female"
								break
								case 2:
									gender = "Male"
								break
								default:
									gender = "Custom"
							}
							let file = fs.createWriteStream("temp/dp.jpg")
							message += "Name: " + d.name + "\n"
							if(d.vanity != undefined || d.vanity != null || d.vanity != ""){
								message += "Username: " + d.vanity + "\n"	
							}
							message += "Facebook ID: " + obj[iter].userID + "\n"
							message += "Gender: " + gender + "\n"
							message += "Profile Link: " + d.profileUrl
							let r = request(encodeURI(`https://graph.facebook.com/${obj[iter].userID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
							r.pipe(file)
							file.on("close", () => {
								api.sendMessage({
									body: message,
									attachment: fs.createReadStream(__dirname + "/../temp/dp.jpg").on("end", async () => {
										fs.unlink(__dirname + "/../temp/dp.jpg", (err) => {})
									})
								}, event.threadID, event.messageID)
							})
						})
					}
				})
			}
		}
	}
}
