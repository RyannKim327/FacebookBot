const fs = require("fs")

module.exports = (name) => {
	// TODO: Gender identification program
	// INFO: It was just based on the name provided and inserted to the data that was given by the administrator
	let names = name.toLowerCase()
	let json = JSON.parse(fs.readFileSync("data/gender.json", "utf8"))
	let gender = {
		eng: "Mr./Ms.",
		tag: "Ginoong/Binibining"
	}
	if(json.male.includes(names) && json.female.includes(names)){
		gender = {
			eng: "Mr./Ms.",
			tag: "Ginoong/Binibining"
		}
	}else if(json.male.includes(names)){
		gender = {
			eng: "Mr.",
			tag: "Ginoong"
		}
	}else if(json.female.includes(names)){
		gender = {
			eng: "Ms.",
			tag: "Binibining"
		}
	}
	return gender
}
