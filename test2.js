function m(next){
    console.log("M: ")
    return async (text) => {
        console.log("Main")
        if(/:([\w]+)/i.test(text)){
            return await next(text)
        }
        // console.log("Fetch " + text)
        return
    }
}

function m2(text){
    console.log("M2: " + text)
}

a = [
    "Hello",
    ":Hi",
    "World",
    ":s"
]

a.map(async (item, index) => {
    const x = m(m2)
    await x(item)
})

// x = "sample\\s([a-z+)"

// console.log(/([\( | \[ | \] | \)]+)/gi.test(x))
