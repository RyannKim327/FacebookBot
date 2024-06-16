const config = require("./configure")

// INFO: Adding commands
config.addCommand({
	name: "Admin Command List",
	description: "Just a helpdesk for admins",
	script: admin,
	category: "onetime",
	command: "admin",
	admin: true
})

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


