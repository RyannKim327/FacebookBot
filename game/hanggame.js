const axios = require("axios")
const fs = require("fs")
const regex = require("../utils/regex")

async function getWord(){
	const { data } = await axios.get("https://random-word-api.herokuapp.com/word")
	return data
}

module.exports = async (api, event, regex) => {
	const word = await getWord()
	const data = event.body.match(regex)
	const json = JSON.parse(fs.readFileSync("data/games"))
}