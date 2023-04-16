const fs = require("fs")
const fetch = require("node-fetch")
const afk = require("./../utils/afk")
const react = require("./../utils/react")

let c2 = async (name, str, sender) => {
	let data = ""
	let json_data = JSON.parse(fs.readFileSync("data/preferences.json"))
	let aboutSelf = {
		name:{
			first_name: "Ryann Kim",
			middle_name: "Malabanan",
			surname: "Sesgundo",
			nickname: json_data.name,
			otherNames: [
				"MPOP Reverse II",
				"RySes",
				'RyannKim327'
			],
		},
		description: "An Artificial Inteligence program from OpenAI, which implemented and developed as a Facebook Virtual Assistant by MPOP Reverse II.",
		powered_by: "OpenAI",
		developed_by: "MPOP Reverse II",
		prefix: json_data.prefix,
		ai_prefix: json_data.name,
		helpCommand: `${json_data.prefix}help`
	}
	let dev = {
		who: {
			firstname: "Ryann Kim",
			middlename: "Malabanan",
			surname: "Sesgundo",
			nickname: "Kim",
			otherNames: [
				"MPOP",
				"RySes",
				"RyannKim327"
			]
		},
		birthDay: "July 30 2005",
		gender: "Male",
		isStudent: true,
		school: {
			elementary: "Bataan Elementary School",
			highschool: "Calubcub 1.0 National Highschool",
			senios_highschool: "AMA Computer Colleges",
			college: "Dalubhasaan ng Lungsod ng Lucena"
		},
		currentlyStudy: "college",
		programming: {
			started: 2016,
			firstLanguages: "Python, HTML[Markup Language], Markdown",
			learningInProcess: [
				"Java and XML for Android Development",
				"Java for Desktop GUI and Consoles",
				"Python for Data Analytics, GUI and Machine Learning",
				"HTML, CSS, Javascript for frontend development",
				"NodeJS and JSON, as backend development",
				"PHP and MySQL for backend development",
				"C# for console [Unity Game Development Soon]"
			],
			skillLevel: "Newbie"
		},
		facebook: "https://facebook.com/MPOP.ph",
		github: "https://github.com/RyannKim327",
		linkedin: "https://linkedin.com/in/RyannKim327",
		replit: "https://replit.com/@RyannKim327"
	}
	let what = {
		mpop: {
			name: "MPOP",
			acronym: "Master Piece of Paper",
			foundedYear: "2016",
			foundedBy: "Ryann Kim Sesgndo",
			isHuman: true,
			history: {
				originalName: "MPOP Modifiers Group",
				year: 2016,
				newName: "MPOP Reverse II",
				renameYear: "2019"
			},
			moreInfo: "came from a line from one of my teacher in MAPeH that to create a \"Master Piece\" in a \"Piece of Paper\". The teacher named Joewel Anareta. At first, it was a group of modders, but later on, used as a name of Ryann Kim Sesgundo for himself."
		}
	}
	let mentors = {
		mentors: [{
			name: "Eljohn Gonzales Mago",
			about: "Mamaw po sa development ito"
		},{
			name: "John Paul Caigas",
			about: "Ito naman ung nagturo sa akin na mag host ng bot, at sya ung source kung paano gumawa ng NPM package na itinuro kay Lester Navarra"
		},{
			name: "Lester Navarra",
			about: "Sya ung nagturo sa akin ng pag publish ng project as NPM. At nagturo patungkol sa webscraping sa NodeJS."
		},{
			name: "Mark Kevin Manalo",
			about: "Sya ung nagbigay ng code ng openai 3.5"
		},{
			name: "Earl Shine Sawir",
			about: "Sya ung nagturo sa paggawa ng bot"
		},{
			name: "John Roy Lapida Calimlim",
			about: "Tinuruan nya ko from android development hanggang sa ilang NodeJS definitions"
		},{
			name: "John Jeremy Antigou",
			about: "Isa sa mga nagpausong muli ng Facebook Bot"
		},{
			name: "Salvador",
			about: "Mamaw to. mentor ng lahat di lang ako"
		},{
			name: "Mart Anthony Salazar",
			about: "A student who helped me to understand more about NodeJS"
		},{
			name: "Jovanny De Leon",
			about: "A student with professional skills in programming."
		}],
		descriptions: "Mentors are not the member of MPOP Reverse II, instead MPOP Reverse II is a screen name or developer name of Ryann Kim Sesgundo"
	}
	let finalized = {
		aboutSelf,
		aboutDeveloper: dev,
		myMentors: mentors,
		aboutMPOP: what
	}
	let infos = {
		model: "gpt-3.5-turbo",
		temperature: 0.5,
		max_tokens: 3000,
		top_p: 0.3,
		frequency_penalty: 0.5,
		presence_penalty: 0.0,
		user: "Kim",
		messages: [{
			role: "system",
			content: JSON.stringify(finalized)
		},{
			role: "system",
			content: JSON.stringify({
				i_am: sender
			})
		},{
			role: "user",
			content: str
		}]
	}
	try{
		let mydata = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${process.env['openai']}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(infos)
		})
		data = mydata.json()
	}catch(e){
		console.log(JSON.stringify(e))
		data = "Something went wrong."
	}
	return data
}

module.exports = async (api, event) => {
	let body = event.body
	let json = JSON.parse(fs.readFileSync("data/preferences.json", "utf8"))
	let username = await api.getUserInfo(api.getCurrentUserID())
	let sendee = await api.getUserInfo(event.senderID)
	let sender = sendee[event.senderID].name
	api.setMessageReaction("🤔", event.messageID, (e) => {}, true)
	if(body.split(" ").length > 1){
		try{
			let ai = await c2(username[api.getCurrentUserID()].name, body, sender)
			console.log(JSON.stringify(ai))
			let msg = ai.choices[0].message.content.split("\n")
			while(msg[0] == ""){
				msg.shift()
			}
			api.sendMessage("⠀" + msg.join("\n"), event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}else{
					api.setMessageReaction("", event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
		}catch(e){
			console.log(e)
			api.sendMessage("Something went wrong", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react, event.messageID, (e) => {}, true)
				}else{
					api.setMessageReaction("", event.messageID, (e) => {}, true)
				}
				afk(api, json)
			})
		}
	}
}
