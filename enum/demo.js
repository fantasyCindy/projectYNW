var list = [
    { date: "2017-8-9", name: "a" },
    { date: "2017-8-9", name: "b" },
    { date: "2017-8-8", name: "c" },
    { date: "2017-8-8", name: "d" },
]


var flag = ""
var newList = []
list.forEach(item => {
    if (item.date != flag) {
        newList.push(`<div>${item.date}</div>`)
    }
    newList.push(`<div>${item.name}</div>`)
    flag = item.date
})

console.log(newList.join(""))