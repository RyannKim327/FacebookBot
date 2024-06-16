module.exports = (str) => {
	// TODO: Regular Expression converter
	// INFO: This is just to return the string format text into regular expression
	// NOTE: This was all case insensitive.
	let s = str.replace("/", "\\/").replace("?", /\?/).replace("$", "\\$")
	return new RegExp("^" + s, "i")
}
