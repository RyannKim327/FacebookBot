module.exports = (str) => {
	let s = str.replace("/", "\\/").replace("?", /\?/).replace("$", /\\$/)
	return new RegExp("^" + s, "i")
}