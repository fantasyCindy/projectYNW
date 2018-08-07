module.exports = {
    ajax(url, param, callback) {
        if (typeof param == "function") {
            callback = param
            param = {}
        }

        $.ajax({
            url: url,
            data: param,
            dataType: 'json',
            success(data) {
                callback(data)
            },
            error(err) {
                console.log('===err', err)
            }
        })
    },
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