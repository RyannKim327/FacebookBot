// const time = require("./utils/date")

// console.log(time("Asia/Manila").getFullYear() - 1)

// let data = [
//     {
//         title: "Test",
//         allowed: true
//     },{
//         title: "Test2",
//         allowed: false
//     }, {
//         title: "Test3",
//         allowed: true
//     }
// ]
// for(let i in data){
//     if(data[i].allowed){
//         console.log(data[i].title)
//     }
// }

let data = /commit/
const msg = "commit test"
if(msg.match(data)){
    console.log(msg.match(data)[1])
}

console.log("Executed")