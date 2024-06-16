const config = require("./configure")
const fs = require("fs")

// INFO: Adding commands

// INFO: Admin Commands
config.addCommand({
	name: "Admin Command List",
	description: "Just a helpdesk for admins",
	script: "admin",
	category: "onetime",
	command: "admin",
	admin: true
})

config.addCommand({
	name: "AI Toggle",
	description: "This is to toggle the AI auto chat",
	script: "ai",
	command: "ai",
	admin: true
})

config.addCommand({
	name: "Bot Status checker",
	description: "Just to check if the bot is still alive or not",
	script: "check",
	command: "check",
	admin: true
})

config.addCommand({
	name: "Gender Configuration",
	description: "This is to add the user's gender to the dataset",
	script: "gender",
	command: "gender ([\\w]+) as ([m|f]+)",
	hint: [
		"gender this as [male | female] <message_reply>",
		"gender [name] as [male | female]"
	],
	message_type: [
		"message",
		"message_reply"
	],
	admin: true
})

config.addCommand({
	name: "Message Pin",
	description: "A command to pin a specific message through message reply",
	script: "pin",
	command: "pin",
	prefix: "_",
	message_type: [
		"message",
		"message_reply",
	],
	admin: true
})

config.addCommand({
	name: "Name changer",
	description: "This is to easily change the bot nickname for AI command",
	script: "name",
	command: "name as ([\\w]+)",
	hint: [
		"name as [new bot nickname]"
	],
	admin: true
})

config.addCommand({
	name: "Prefix changer",
	description: "A command to change the current prefix of the bot",
	script: "prefix",
	command: "prefix ([\\W]+)",
	hint: [
		"prefix [any symbol exept backslash]"
	],
	admin: true
})


config.addCommand({
	name: "Status toggler",
	description: "A command to toggle or switch the bot on and off",
	script: "toggle",
	command: "toggle",
	admin: true
})

config.addCommand({
	name: "Unsent a message",
	description: "A command where it unsents the message that the bot sent",
	script: "unsent",
	command: "remove_message",
	admin: true
})

// NOTE: End of admin commands

// INFO: Start of game commands

config.addCommand({
	name: "Answer to a game",
	description: "This program will only trigger once you activate one of the games",
	script: "answer",
	command: "answer ([\\w\\W]+)",
	hint: [
		"answer [your answer]"
	],
	category: "game"
})

config.addCommand({
	name: "Ball Drop",
	description: "A game similar to ball drop",
	script: "dropball",
	command: "drop ([1-5]+)",
	hint: [
		"drop [a number from 1 to 5]"
	]
})

config.addCommand({
	name: "Filipino Riddles",
	description: "A filipino based riddles powered by the contributors online",
	script: "bugtong",
	command: "bugtong",
	category: "game"
})

config.addCommand({
	name: "Jack 'n Poy",
	description: "A filipino game also known as Rock, Paper, Scissors",
	script: "jnp",
	command: "jnp ([r | p | s]+)",
	hint: [
		"jnp [choice] (choice must be r, p, and s where r is for rock, p is for paper and s is for scissors)"
	]
})

config.add({
	name: "Roll dice",
	description: "Roll a dice between you and an opponent",
	script: "dice",
	command: "dice",
	hint: [
		"dice (for vs computer)",
		"dice <message_reply> (for vs a human)"
	],
	message_type: [
		"message",
		"message_reply"
	]
})

// NOTE: End of games command


// INFO: All user's Commands
config.addCommand({
	name: "Help desk",
	description: "A command for introduction and showing all list commands available for all users",
	script: "info",
	category: "onetime",
	command: "help"
})

config.addCommand({
	name: "Audio Verse",
	description: "A audio based verse powered by Biblegateway",
	script: "audioverse",
	category: "theology",
	command: "audioverse ([\\w]+) ([\\d]+)",
	hint: [
		"audioverse [bookname] [chapter]"
	]
})

config.addCommand({
	name: "Baybayin Transliterator",
	description: "A command that transliterate the normal alplabet into baybayin. Please make sure you translate the word from a language into tagalog",
	script: "baybayin",
	category: "education",
	command: "baybay ([\\w\\W]+)",
	hint: "baybay [word or phrase]"
})

config.addCommand({
	name: "Bible verse",
	description: "A bible verse command powered by Biblegateway",
	script: "Biblegateway",
	category: "theology",
	command: "verse ([\\w]+) "
})

config.addCommand({
	name: "Facebook stalker",
	description: "A command where it gives some initial information about to someone. Please note that you need to use this command responsively, don't abuse",
	script: "fb",
	category: "multimedia",
	command: "fb ([\\w\\W]+)",
	hint: [
		"fb this <message_reply>",
		"fb [username]",
		"fb [facebook id]",
		"fb [facebook name] (But not accurate)"
	],
	message_type: [
		"message",
		"message_reply"
	]
})

config.addCommand({
	name: "Games lists",
	description: "A command that shows all the games and its commands to use.",
	script: "game",
	command: "games",
	category: "onetime"
})

config.addCommand({
	name: "Google Gemini Image Recognizer",
	description: "An AI based program where it describe the image powered by Google",
	script: "gemini",
	category: "education",
	command: "analyze ([\\w\\w]+)",
	hint: [
		"analyze [prompt]",
		"analyze this image"
	],
	message_type: [
		"message_reply"
	]
})

command.addCommand({
	name: "Google Search Engine",
	description: "A powerful search engine powered by Google",
	script: "google",
	category: "education",
	command: "search ([\\w\\W]+)",
	hint: [
		"google [anything you want to search]"
	]
})

config.addCommand({
	name: "Guitar Chords",
	description: "A guitar chords provider command powered by tabs ultimate-guitar",
	script: "guitar",
	category: "multimedia",
	command: "chords ([\\w\\W]+)",
	hint: [
		"chords [song title]",
		"chords [song title with singer]"
	]
})

config.addCommand({
	name: "Message show pin",
	description: "A command that shows the current pinned message in a thread pinned by the admin",
	script: "pin",
	command: "pin",
	category: "dump"
})

config.addCommand({
	name: "Not Gonna Lie",
	description: "A command for sending a secret message to someone using their ngl username or link",
	script: "ngl",
	category: "multimedia",
	command: "ngl ([\\w]+) ([\\w\\W]+)",
	hint: "ngl [username] [message]"
})

config.addCommand({
	name: "Youtube Music",
	description: "A music command powered by Youtube Music API and YTDL",
	script: "music1",
	category: "multimedia",
	command: "music ([\\w\\W]+)",
	hint: [
		"music [song title]",
		"music [song title] [singer]",
		"music [youtube url]"
	]
})

// NOTE: End of user commands


config.setAdminGC("7045133965567738")

config.setOptions({
	listenEvents: true,
	selfListen: true,
	forceLogin: true,
	autoReconnect: true,
	logLevel: "silent",
	updatePresence: true,
	userAgent: "Mozilla/5.0 (Linux; Android 11; itel P651L Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.179 Mobile Safari/537.36[FBAN/EMA;FBLC/en_GB;FBAV/399.0.0.16.120;]"
})

config,main(JSON.parse(fs.readFileSync("setup/asset.json", "utf8")))

