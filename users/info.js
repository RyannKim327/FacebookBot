const fs = require("fs")
const afk = require("./../utils/afk")
const { commands, getPrefix, getName } = require("./../config")
const react = require("./../utils/react")

module.exports = async (api, event) => {
	let creds = [
		"Salvador",
		"John Jeremy Antiguo",
		"Earl Shine Sawir",
		"John Paul Caigas",
		"John Roy Lapida Calimlim",
		"Lester Navarra",
		"Jerson Carin",
		"Rovie Francisco",
		"Ken Jovenie Samonte",
		"Mark Kevin Manalo",
		"Mart Anthony Salazar",
		"Eljohn Mago",
		"Jovanny De Leon",
		"LuanRT",
		"Schemavery",
		"VanBanLaNhat",
		"Labs Bible",
		"Biblegateway",
		"Zenquotes",
		"AnimeQuotes",
		"OpenAI",
		"Tabs Ultimate Guitar",
		"DroidModifs",
		"And to all developers of the API used for this project."
	]
	let q = [
		"Education is not just a paper or a certificate, but it is a knowledge that you earned with difficulties.",
		"Sometimes, we know the truth, but we don't accept it.",
		"Time is precious thing that you will never get back.",
		"Life is like a song, it has melody that guides you to live.",
		"Being alone is not the worst thing you may do, if your suroundings fools you.",
		"Don't be afraid to fail, because failures are knowledge you may get.",
		"No one can be a best teacher, except life, and the life is God",
		"Never compare yourself to others, because you're unique.",
		"Happiness is just an illusion of reality.",
		"It's better to be alone that to be with others.",
		"Faith, what a beautiful word. A word that motivates someone to live.",
		"Why there are bunch of songs for broken, even there are lot of people who are like a person but no love.",
		"Love is different with like. Never tell to someone that you love him/her, even you're just liked him/her.",
		"Love is a beautiful word, that ruins your life.",
		"Smile, there are lots of problem but smiling helps you to feel better.",
		"Never tell to someone who am I, instead introduce to them who am I by sharing what I'm telling to you.",
		"My right hand is not good as what you think.",
		"Hold your breath for a second, and think, it is good enough for me to live where I didn't belong in."
	]
	let myID = await api.getCurrentUserID()
	let user = await api.getUserInfo(myID)
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let myname = () => {
	let usn = user[myID]['name']
		if(user[myID]['name'].toLowerCase().includes("bot")){
			usn.replace(/bot/gi, "")
		}
		if(usn.replace(/\s/gi, "") === getName(myID).toLowerCase().replace(/\s/gi, "")){
			return user[myID]['name']
		}else{
			return user[myID]['name'] + " you may also call me " + getName()
		}
	}
	let message = "Hello I am " + myname() + " your friendly facebook bot. Here are my commands that you may used to execute if you want to use my service.\n\n"
	let i = 1
	message += "List of Commands:\n"
	commands.forEach(r => {
		let data = r.data
		if(!data.admin && data.category != "game"){
			message += i + ". " + data.title + "\n~ " + data.description + "\n"
			let j = 1
			if(data.queries != undefined){
				message += "~ Queries:\n"
				data.queries.sort()
				data.queries.forEach(q => {
					message += "  " + j + ". " + getName(myID) + ", " + q.replace(/(\(\[\\w\\W\]\+\))/gi, "<data>").replace(/(\(\[\\w\]\+\))/gi, "<data>").replace(/(\\s)/gi, " ") + "\n"
					j += 1
				})
			}
			j = 1
			if(data.commands != undefined){
				data.commands.sort()
				message += "~ Commands:\n"
				data.hints.forEach(q => {
					message += "  " + j + ". " + getPrefix() + q.replace(/\s/gi, " ") //.replace(/(\(\[\\w\\W\]\+\))/gi, "<data>").replace(/(\(\[\\w\]\+\))/gi, "<data>").replace(/(\(\[\\w\\s:;-\]\+\))/,"<data>").replace(/(\\s)/gi, " ").replace(/(\$)/gi, "") + "\n"
					j += 1
				})
			}
			message += "\n"
			i += 1
		}
	})
	message += "\nCredits to the following:\n"
	i = 1
	creds.forEach(r => {
		message += i + ". " + r + "\n"
		i += 1
	})
	message += "\n" + q[Math.floor(Math.random() * q.length)]
	api.sendMessage(message, event.threadID, (e, m) => {
		if(e){
			api.setMessageReaction(react, event.messageID, (e) => {}, true)
		}
		afk(api, json)
	})
}
