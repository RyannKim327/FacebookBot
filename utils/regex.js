module.exports = (str) => {
	let s = str.replace("/", "\\/").replace("?", /\\?/)
	return new RegExp("^" + s, "i")
}