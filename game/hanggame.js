const axios = require("axios")
const fs = require("fs")

async function getWord(){
	const { data } = await axios.get("https://random-word-api.herokuapp.com/word")
	return data
}

MessagePort