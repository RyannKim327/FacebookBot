module.exports = (str) => {
	let s = str.replace("/", "\\/").replace("?", /\\?/)
	if(s.startsWith("$")){
		s = s.replace("$", )
	}
	return new RegExp("^" + s, "i")
}