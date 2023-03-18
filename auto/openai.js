const { Configuration, OpenAIApi } = require("openai")
const fs = require("fs")
const fetch = require("node-fetch")
const react = require("./../utils/react")

let config = async (name, str) => {
	let configurations = new Configuration({
		"apiKey": process.env['openai']
	})
	let json_data = JSON.parse(fs.readFileSync("data/preferences.json"))
	let openai = new OpenAIApi(configurations)
	/*let { data } = await openai.createCompletion({
		prompt: str,
		model: "text-davinci-003",
		temperature: 0.5,
		max_tokens: 4000,
		top_p: 0.3,
		frequency_penalty: 0.5,
		presence_penalty: 0.0,
		user: "Kim"
	})*/
	let aboutSelf = {
		first_name: "Ryann Kim",
		middle_name: "Malabanan",
		surname: "Sesgundo",
		nickname: json_data.name,
		description: "An Artificial Inteligence program from OpenAI, which implemented and developed as a Facebook Bot Virtual Assistant by MPOP Reverse II.",
		powered_by: "OpenAI",
		developed_by: "MPOP Reverse II",
		prefix: json_data.prefix,
		ai_prefix: json_data.name
	}
	let { data } = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		temperature: 0.5,
		max_tokens: 3000,
		top_p: 0.3,
		frequency_penalty: 0.5,
		presence_penalty: 0.0,
		user: "Kim",
		messages: [{
			role: "system",
			content: JSON.stringify(aboutSelf) //"you're an artificial inteligence program from openai, which implemented as a virtual facebook ai assistant. Your name is Ryann Kim Sesgundo, but they may call you Kim and developed under the name and developed by MPOP Reverse II. Your prefix is / and the AI prefix is Kim"
		},{
			role: "user",
			content: str
		}]
	}).catch(error => {
		return error.message
	})
	return data
}

let c2 = async (name, str) => {
	let data = ""
	let json_data = JSON.parse(fs.readFileSync("data/preferences.json"))
	let aboutSelf = {
		first_name: "Ryann Kim",
		middle_name: "Malabanan",
		surname: "Sesgundo",
		nickname: json_data.name,
		description: "An Artificial Inteligence program from OpenAI, which implemented and developed as a Facebook Virtual Assistant by MPOP Reverse II.",
		powered_by: "OpenAI",
		developed_by: "MPOP Reverse II",
		prefix: json_data.prefix,
		ai_prefix: json_data.name
	}
	let dev = {
		who: "Ryann Kim Malabanan Sesgundo",
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
		facebook: "https://facebook.com/MPOP.ph",
		github: "https://github.com/RyannKim327"
	}
	let mentors = {
		mentors: [{
			name: "Eljohn Mago",
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
		}]
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
			content: JSON.stringify(aboutSelf) //"you're an artificial inteligence program from openai, which implemented as a virtual facebook ai assistant. Your name is Ryann Kim Sesgundo, but they may call you Kim and developed under the name and developed by MPOP Reverse II. Your prefix is / and the AI prefix is Kim"
		},{
			role: "system",
			content: JSON.stringify(dev)
		},{
			role: "system",
			content: JSON.stringify(mentors)
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
	let username = await api.getUserInfo(api.getCurrentUserID())
	if(body.split(" ").length > 1){
		try{
			let ai = await c2(username[api.getCurrentUserID()].fullName, body)
			let msg = ai.choices[0].message.content.split("\n")
			while(msg[0] == ""){
				msg.shift()
			}
			api.sendMessage("⠀" + msg.join("\n"), event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react(), event.messageID, (e) => {}, true)
				}
			})
		}catch(e){
			console.log(e)
			api.sendMessage("Something went wrong", event.threadID, (e, m) => {
				if(e){
					api.setMessageReaction(react(), event.messageID, (e) => {}, true)
				}
			})
		}
	}
}
