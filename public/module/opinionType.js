var types = require('e/opinion-type')

module.exports = {
    create() {
        var tags = ""
        for (var key in types) {
            var value = types[key]
            tags += `<span class="opinion-type-item" value="${key}">${value}</span>`
        }
        return `<div class="opinion-type-items">${tags}</div>`
    }
}