function m(next){
    console.log("M: ")
    return async (text) => {
        console.log("Main")
        if(text !== "Hi"){
            return await next(text)
        }
        console.log("Fetch " + text)
    }
}

function m2(text){
    console.log("M2: " + text)
}

a = [
    "Hello",
    "Hi",
    "World"
]

a.map(async (item, index) => {
    const x = m(m2)
    await x(item)
})
