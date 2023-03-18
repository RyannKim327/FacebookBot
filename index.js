const config = require("./config")
const server = require("./server")

config.add("admin", {
	title: "Admin commands",
	description: "Lists of all admin commandments.",
	commands: [
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
	admin: true
})

config.add("busy", {
	title: "Busy Mode",
	description: "Setup by an admin during busy.",
	commands: [
		"busy",
		"clearbusy"
	],
	admin: true
})

config.add("check", {
	title: "Bot status Checker",
	description: "A message reaction program, to check if the bot is still alive or not.",
	commands: [
		"check"
	],
	admin: true
})

config.add("feeds", {
	title: "Application feedback",
	description: "For feedbacks and error comming from the app.",
	commands: [
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
	hasArgs: true,
	admin: true
})

config.add("toggle", {
	title: "Toggle Status",
	description: "For admin use",
	commands: [
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
	admin: true,
	hasArgs: true
})

config.add("worship", {
	title: "New Worship song",
	description: "Add new worship song playlist.",
	commands: [
		"add worship song ([\\w\\W]+)"
	],
	hasArgs: true,
	admin: true
})

config.add("worshiplists", {
	title: "Worship song lists",
	description: "Get worship song playlist.",
	commands: [
		"worship lists"
	],
	admin: true
})

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
	hasCooldown: false,
	category: "oneTime"
})

config.add("audioverse", {
	title: "Audio Verse",
	description: "An audio version of a whole chapter in the bible",
	commands: [
		"audio verse ([\\w\\W]+)"
	],
	hasCooldown: false,
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
	hasArgs: true,
	category: "knowledge"
})

config.add("game", {
	title: "Game lists",
	description: "Still ongoing, soon to be initialized.",
	commands: [
		"game lists"
	],
	category: "oneTime"
})

config.add("genimg", {
	title: "Image Generator",
	description: "Beta test",
	queries: [
		"create an image of ([\\w\\W]+)",
		"generate an image of ([\\w\\W]+)",
		"generate an image that ([\\w\\W]+)"
	],
	hasArgs: true,
	category: "multimedia"
})

config.add("google", {
	title: "Google Search Engine",
	description: "A command with educational purposes searches.",
	commands: [
		"google ([\\w\\W]+)"
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
	hasArgs: true,
	category: "multimedia"
})

config.add("imgtxt", {
	title: "Text recognizer from image",
	description: "This will extract the text scanned. The result is based on the image quality",
	commands: [
		"img2txt"
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
/*
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
*/
config.add("pdf", {
	title: "PDF Downloader",
	description: "Powered by PDF Drive",
	commands: [
		"pdf ([\\w\\W]+)"
	],
	hasArgs: true,
	category: "knowledge"
})
		
config.add("pin", {
	title: "Show pinned message",
	description: "Showing the current pinned message",
	commands: [
		"pin"
	],
	hasCooldown: false,
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

config.add("tlverse", {
	title: "Tagalog verse Test",
	description: "Tagalog bible verses",
	commands: [
		"tlverse ([\\w\\W]+)"
	],
	hasArgs: true,
	hasCooldown: false,
	category: "theology"
})

config.add("verse", {
	title: "Bible verse",
	description: "May share an specific bible verse requested by a user, or send a random verse given by the server.",
	queries: [
		"may I have a random bible verse please",
		"what is ([\\w\\W]+) in the bible",
		"may I have ([\\w\\W]+) in the bible please"
	],
	commands: [
		"verse$",
		"verse ([\\w\\W]+)$"
	],
	hasArgs: true,
	hasCooldown: false,
	category: "theology"
})

config.add("video", {
	title: "Youtube Video Command",
	description: "This will send the top search result video from youtube platform.",
	queries: [
		"play the video ([\\w\\W]+) please",
		"please play the video ([\\w\\W]+)"
	],
	commands: [
		"video ([\\w\\W]+)$"
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
	description: "Test Mode",
	commands: [
		"answer ([\\w\\W]+)"
	],
	hasArgs: true,
	category: "game"
})

config.setDefaultName("Kim")

// config.setAdmins("100081698814451")
config.setOptions({
	listenEvents: true,
	selfListen: true
})

// s2 -> Ry Ses
/* state -> RySes Malabanan

config.start({
	appState: JSON.parse(process.env['s2'])
})
*/

config.start({
	appState: JSON.parse(process.env['ryann'])
})


let run = () => {
	console.log("Run")
	setTimeout(run, (1000 * 60) * 60)
}
server()
