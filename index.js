const config = require("./config")
const server = require("./server")
const repl = require("./replit_only.js")

config.add("admin", {
	title: "Admin commands",
	description: "Lists of all admin commandments.",
	commands: [
		"admin"
	],
	hints: [
		"admin"
	],
	admin: true
})

config.add("ai", {
	title: "AI Mode",
	description: "For auto responses using reply method",
	commands: [
		"ai"
	],
	hints: [
		"ai"
	],
	admin: true
})

config.add("busy", {
	title: "Busy Mode",
	description: "Setup by an admin during busy.",
	commands: [
		"busy",
		"clearbusy"
	],
	hints: [
		"busy",
		"clearbusy"
	],
	admin: true
})

config.add("check", {
	title: "Bot status Checker",
	description: "A message reaction program, to check if the bot is still alive or not.",
	commands: [
		"check",
		"silent"
	],
	
	hints: [
		"check",
		"silent"
	],
	admin: true
})

config.add("feeds", {
	title: "Application feedback",
	description: "For feedbacks and error comming from the app.",
	commands: [
		"feedback"
	],
	hints: [
		"feedback"
	],
	admin: true
})

config.add("gender", {
	title: "Add new Gender",
	description: "Setup by an admin to add a new name data with gender..",
	commands: [
		"gender ([\\w\\s]+) to ([\\w]+)",
		"gender ([\\w\\s]+) as ([\\w]+)"
	],
	hints: [
		"gender <user> to <female|male>",
		"gender <user> as <female|male>"
	],
	admin: true,
	hasArgs: true,
	type: [
		"message",
		"message_reply"
	]
})

config.add("name", {
	title: "New bot name",
	description: "For modifications only",
	commands: [
		"set name as ([\\w]+)"
	],
	hints: [
		"set name as <name>"
	],
	hasArgs: true,
	admin: true
})

config.add("off", {
	title: "Off/On Bot Feature",
	description: "Setup by an admin to enable/disable the bot commands in a particular group or person.",
	commands: [
		"bot off",
		"bot on"
	],
	hints: [
		"bot off",
		"bot on"
	],
	type: [
		"message",
		"message_reply"
	],
	admin: true
})

config.add("pin", {
	title: "Pin a message",
	description: "Setup a pinned message, or show the pinned message.",
	commands: [
		"clearpin",
		"pin"
	],
	hints: [
		"clearpin",
		"pin"
	],
	type: [
		"message_reply"
	],
	admin: true
})

config.add("prefix", {
	title: "Prefix Change",
	description: "To change the prefix.",
	commands: [
		"prefix ([\\W])"
	],
	hints: [
		"prefix <symbol>"
	],
	hasArgs: true,
	admin: true
})

config.add("toggle", {
	title: "Toggle Status",
	description: "For admin use",
	commands: [
		"toggle"
	],
	hints: [
		"toggle"
	],
	admin: true
})

config.add("unsent", {
	title: "Unsent Messgae",
	description: "Unsent a message by only and admin can do",
	commands: [
		"unsent",
		"unsend"
	],
	hints: [
		"unsent [reply]",
		"unsend [reply]"
	],
	admin: true,
	type: [
		"message_reply"
	]
})

config.add("updates", {
	title: "Application Updates",
	description: "An updater of app",
	commands: [
		"app_update ([\\W\\w]+)$"
	],
	hints: [
		"app_update <data>"
	],
	admin: true,
	hasArgs: true
})

config.add("worship_cron", {
	title: "Worship Song Cron test",
	description: "Test",
	commands: [
		"worship"
	],
	hints: [
		"worship"
	],
	admin: true
})

config.add("vips", {	
	title: "Worship Song Cron test",
	description: "Test",
	commands: [
		"vip"
	],
	hints: [
		"vip"
	],
	admin: true,
	type: [
		"message_reply"
	]
})

// config.add("worship", {
// 	title: "New Worship song",
// 	description: "Add new worship song playlist.",
// 	commands: [
// 		"add worship song ([\\w\\W]+)"
// 	],
// 	hasArgs: true,
// 	admin: true
// })

// config.add("worshiplists", {
// 	title: "Worship song lists",
// 	description: "Get worship song playlist.",
// 	commands: [
// 		"worship lists"
// 	],
// 	admin: true
// })

config.add("info", {
	title: "Bot Information",
	description: "A simple introduction about the bot.",
	queries: [
		"who are you",
		"please introduce yourself to us"
	],
	commands: [
		"info",
		"help",
		"intro",
		"how",
		"tut"
	],
	hints: [
		"info",
		"help",
		"intro",
		"how",
		"tut"
	],
	category: "oneTime"
})

config.add("audioverse", {
	title: "Audio Verse",
	description: "An audio version of a whole chapter in the bible",
	commands: [
		"audio verse ([\\w\\W]+)"
	],
	hints: [
		"audio verse <book> <chapter>"
	],
	hasArgs: true,
	category: "theology"
})

config.add("baybayin", {
	title: "Baybayin Transliterator",
	description: "A command which can transform a normal text into baybayin characters.",
	queries: [
		"please transliterate ([\\w\\W]+) to baybayin",
	],
	commands: [
		"baybay ([\\w\\W]+)",
		"baybayin ([\\w\\W]+)"
	],
	hints: [
		"baybay <phrase>",
		"baybayin <phrase>"
	],
	hasArgs: true,
	category: "knowledge"
})

config.add("beshy", {
	title: "Beshifier Command",
	description: "Bakit nga naman malungkot",
	commands: [
		"beshy ([\\w\\W]+)"
	],
	hints: [
		"beshy <phrase>"
	],
	hasArgs: true,
	category: "multimedia"
})

config.add("fb", {
	title: "Facebook Information Profiling",
	description: "A command that gives you the basics information of the account owner, according to its facebook profile",
	commands: [
		"fb ([\\w\\W]+)"
	],
	hints: [
		"fb @<someone>",
		"fb this [reply]",
	],
	hasArgs: true,
	type: [
		"message",
		"message_reply"
	],
	category: "dump"
})

config.add("game", {
	title: "Game lists",
	description: "Still ongoing, soon to be initialized.",
	commands: [
		"game lists"
	],
	hints: [
		"game lists"
	],
	category: "oneTime"
})

// config.add("genimg", {
// 	title: "Image Generator",
// 	description: "Beta test",
// 	queries: [
// 		"create an image of ([\\w\\W]+)",
// 		"generate an image of ([\\w\\W]+)",
// 		"generate an image that ([\\w\\W]+)"
// 	],
// 	hasArgs: true,
// 	category: "multimedia"
// })

config.add("google", {
	title: "Google Search Engine",
	description: "A command with educational purposes searches.",
	commands: [
		"google ([\\w\\W]+)"
	],
	hints: [
		"google <query>"
	],
	hasArgs: true,
	category: "knowledge"
})

config.add("guitar", {
	title: "Ultimate Guitar Tabs Command",
	description: "A command which gives you a random guitar chords/tabs.",
	commands:[
		"guitar ([\\w\\W]+)",
		"tabs ([\\w\\W]+)"
	],
	hints: [
		"guitar <song>",
		"tabs <song>"
	],
	hasArgs: true,
	category: "multimedia"
})

config.add("imgtxt", {
	title: "Text recognizer from image",
	description: "This will extract the text scanned. The result is based on the image quality",
	commands: [
		"img2txt"
	],
	hints: [
		"img2txt [reply only]"
	],
	type: [
		"message_reply"
	],
	category: "multimedia"
})

config.add("lexi", {
	title: "Lexica Art",
	description: "Test mode image generator",
	commands: [
		"lexi ([\\w\\W]+)"
	],
	hasArgs: true,
	category: "multimedia"
})

config.add("music", {
	title: "YouTube Music Command",
	description: "A music command which gives you a youtube music based results",
	queries: [
		"play the song ([\\w\\W]+) please",
		"please play the song ([\\w\\W]+)"
	],
	commands: [
		"music ([\\w\\W]+)",
		"sing ([\\w\\W]+)",
		"play ([\\w\\W]+)"
	],
	hasArgs: true,
	category: "multimedia"
})

config.add("news", {
	title: "Manila Times News",
	description: "A daily news update requests from manila times.",
	commands: [
		"news ([\\w\\W]+)",
		"news"
	],
	hasArgs: true,
	category: "news"
})

config.add("ngl", {
	title: "Not Gonna Lie Command", 
	description: "NGL Command",
	commands: [
		"ngl ([\\w]+) ([\\w\\W]+)"
	],
	hasArgs: true,
	category: "multimedia"
})

// config.add("pdf", {
//	title: "PDF Downloader",
//	description: "Powered by PDF Drive",
//	commands: [
//		"pdf ([\\w\\W]+)"
//	],
//	hasArgs: true,
//	category: "knowledge"
// })

config.add("pin", {
	title: "Show pinned message",
	description: "Showing the current pinned message",
	commands: [
		"pin"
	],
	category: "oneTime"
})

config.add("ris", {
	title: "Reverse Image Search",
	description: "A google feature command for some researches.",
	commands: [
		"ris"
	],
	type: [
		"message_reply"
	],
	category: "knowledge"
})

config.add("subs", {
	title: "Subscribe to cron",
	description: "Is is a way for you to subscribe and get daily cron updates from the bot.",
	commands: [
		"subscribe",
		"unsubscribe"
	],
	category: "oneTime"
})

config.add("biblegateway", {
	title: "Bible verse ",
	description: "Bible verses powered by biblegateway",
	commands: [
		"verse (1905|1978|2001|snd|niv|esv|kjv|nlt|b1905|b1978|b2001|bsnd) ([\\w\\s:;-]+)",
		"verse ([\\w\\s:;-]+)"
	],
	hasArgs: true,
	category: "theology"
})

config.add("video", {
	title: "Youtube Video Command",
	description: "This will send the top search result video from youtube platform. Sometimes, this feature has error, due to the limit of facebook messenger that can only sent upto 25mb.",
	queries: [
		"play the video ([\\w\\W]+) please",
		"please play the video ([\\w\\W]+)"
	],
	commands: [
		"video ([\\w\\W]+)"
	],
	hasArgs: true,
	category: "multimedia"
})

config.add("wiki", {
	title: "Wikipedia Search",
	description: "A simple search document which gives you a wikipedia based resukts.\nDisclaimer: Wikipedia is not so accurate so that if you were using this for research purposes, please don't continue it.",
	queries: [
		"please search ([\\w\\W]+) please",
		"can I have a wiki result of ([\\w\\W]+)"
	],
	commands: [
		"wiki search ([\\w\\W]+)$",
		"wiki ([\\w\\W]+)$"
	],
	hasArgs: true,
	category: "knowledge"
})

config.add("word", {
	title: "Wiki Dictionary",
	definition: "A wiki based result word informations",
	commands: [
		"word ([\\w]+)$"
	],
	hasArgs: true,
	category: "knowledge"
})

config.add("dropball", {
	title: "Dropball Game",
	description: "For test",
	commands: [
		"drop ([\\d]+)"
	],
	hasArgs: true,
	category: "game"
})

config.add("dice", {
	title: "Dice Roll",
	description: "Rolling a die",
	commands: [
		"dice"
	],
	category: "game",
	type: [
		"message",
		"message_reply"
	]
})

config.add("bugtong", {
	title: "Pinoy Riddles",
	description: "A filipino based riddles",
	commands: [
		"bugtong"
	],
	category: "game"
})

config.add("answer", {
	title: "Answer bot games",
	description: "This is the way for you to answer some question from facebook bot.",
	commands: [
		"answer ([\\w\\W]+)"
	],
	hasArgs: true,
	category: "game"
})

config.addAdmins("100011558238843")
config.addAdmins("100081698814451")

config.setOptions({
	listenEvents: true,
	selfListen: true,
	forceLogin: true,
	autoReconnect: true,
	logLevel: "silent",
	updatePresence: true,
})

config.start({
	appState: JSON.parse(process.env['user'])
})


let run = () => {
	console.log("Run")
	setTimeout(run, (1000 * 60) * 60)
}
server()
repl()