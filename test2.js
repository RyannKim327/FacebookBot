function m(next){
    console.log("M: ")
    return async (text) => {
        if(/:([\w]+)/i.test(text)){
            const t = n(next)
            const res = await t(text)
            if(res)
                console.log(res.response)
        }
        // console.log("Fetch " + text)
        // return
    }
}

function n(next){
    console.log("Test N")
    return async (text) => {
        if(text.length > 4){
            return await next(text)
        }
        return
    }
}

function m2(text){
    return {
        response: "M2: " + text
    }
}

a = [
    "Hello",
    ":Hello world",
    "World",
    ":s"
]

a.map(async (item, index) => {
    const x = m(m2)
    await x(item)
})

// x = "sample\\s([a-z+)"

// console.log(/([\( | \[ | \] | \)]+)/gi.test(x))
