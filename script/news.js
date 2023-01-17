const axios = require("axios")
const http = require("https")
const react = require("./../utils/react")

let getDate = () => {
	Let date = new Date()
	let d = new Date(date.toLocaleString('en-US', {
		timezone: "Asia/Manila"
	}))
	return new Date(date.getTime() - (date.getTime() - d.getTime()))
}

let news = async () => {
	let time = getDate()
	let { data } = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=${time.getFullYear()}-${(time.getMonth() + 1)}-${(time.getDate() - 1)}&sortBy=publishedAt&apiKey=${process.env['news']}`)
	return data
}

module.exports = async (api, event) => {
	let _new = await news()
	let articles = _new.articles
	let random = Math.floor(Math.random() * articles.length)
	let n = articles[random]
	if(n.urlToImage == null){
		api.sendMessage({
			body: `Title: ${n.title}\n`
		}, event.threadID)
	}
}