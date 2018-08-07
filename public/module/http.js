
module.exports = {
    getJSON(url, param, callback) {
        if (typeof param == "function") {
            callback = param
            param = {}
        }
        $.getJSON(url, param, back => {
            callback(back)
        })
    },
    postJSON(url, param, callback) {
        if (typeof param == "function") {
            callback = param
            param = {}
        }
        $.post(url, param, back => {
            callback(back)
        }, 'json')
    },
    post(url, param, callback) {
        if (typeof param == "function") {
            callback = param
            param = {}
        }
        $.post(url, param, back => {
            callback(back)
        })
    }
}