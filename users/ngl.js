const axios = require("axios")

module.exports = async (api, event, regex) => {
	const username = event.body.match(regex)[1]
	const message = event.body.match(regex)[2]

	const user_agent = [
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",

		"Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/113.0.5672.109 Mobile/15E148 Safari/604.1",
		"Mozilla/5.0 (iPad; CPU OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/113.0.5672.109 Mobile/15E148 Safari/604.1",
		"Mozilla/5.0 (iPod; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/113.0.5672.109 Mobile/15E148 Safari/604.1",
		
		"Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.76 Mobile Safari/537.36",
		
		"Mozilla/5.0 (X11; Linux x86_64; rv:108.0) Gecko/20100101 Firefox/108.0",
		"Mozilla/5.0 (X11; Linux i686; rv:109.0) Gecko/20100101 Firefox/113.0",
		"Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0",

		"Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:109.0) Gecko/20100101 Firefox/113.0",
		"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
		"Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
		
		""
	]
	let agent = user_agent[Math.floor(Math.random() * user_agent.length)]
	username = username.toLowerCase().replace(/\s/gi, "")
	let f = await axios.post("https://ngl.link/api/submit", {
		headers: {
			"Content-Type": "application/json",
			"user-agent": agent
		},
		"question": message,
		"username": username,
		"deviceId": ""
	}).then(res => {
		let js = res.data
		js['msg'] = message
		js['username'] = username
		js['user-agent'] = agent
		console.log(js)
		return js
	}).catch(e => {
		api.sendMessage()
	})
}
