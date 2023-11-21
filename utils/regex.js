module.exports = (str) => {
	let s = str
	if(s.startsWith("/")){
		s = s.replace("/", "\\/")
	}
	if(s.startsWith("?")){
		s = s.replace("?", /\\?/)
	}
	if(s.startsWith("$")){
		s = s.replace("$", /\$/)
	}
	return new RegExp("^" + s, "i")
}