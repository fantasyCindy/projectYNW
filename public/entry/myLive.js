require('~/center/center.js')
yn.centerMenu.init({ render: 'my', light: '我的直播' })
var error = require("e/error-type")
    // var element = require('element-ui')



/* 
    


 */



// 四种状态, 直播/历史, vip/普通老师
var table_entry = {
    vip_living: ops => `http://cp.yueniucj.com/live/vipLive.htm?roomid=34`, //VIP直播室
    vip_history: ops => `${live_path}/live/live-vip-inside.htm#roomid=${roomid}`, //VIP历史直播
    normal_living: ops => `${live_path}live/${ynTeacherId}/`,
    normal_history: ops => `${live_path}live/liveDetailLive.htm?teacherid=${ynTeacherId}&periodical=${ops.pid}`
}


var key_user = is_vip == "1" ? "vip" : 'normal';
var error = require('e/error-type');
new Vue({
    el: '#myLive',
    data: {
        items: [],
        page: 1,
        size: 20,
        total: 0
    },
    methods: {
        getData() {
            var defer = $.Deferred()
            $.getJSON("/center/queryMyLive.htm", {
                user_id: ynUserId,
                pageSize: this.size,
                currentPage: this.page
            }, data => {
                if (data.status == 1) {
                    defer.resolve(data)
                } else{
                    return layer.msg(error[data.status]) }
            })
            return defer.promise()
        },

        render() {

            var handleData = arr => {
                return _.map(arr, item => {
                    item._time = item.starttime.match(/^[^\s]+/)[0];
                    var isLiving = +item.status == 0;

                    // 构建查询键
                    var key_status = isLiving ? 'living' : 'history';
                    var key = `${key_user}_${key_status}`;

                    //查询链接
                    item._link = table_entry[key]({ pid: item.periodicalid });
                    item._linkText = isLiving ? '正在直播' : '查看记录'
                    item._operateText = isLiving ? '关闭直播室' : '--'
                    item._liveClose = isLiving ? 'liveClose' : ''
                    return item
                })
            }

            this.getData().done(back => {
                this.items = handleData(back.data.list)
                this.total = +back.data.total;
            })
        },
        enter() {
            $.getJSON("/center/openPeriodical.htm", { user_id: ynUserId }, data => {
                if (data.status == 1) {
                    var key = `${key_user}_living`;
                    location.href = table_entry[key]();
                }else {return layer.msg(error[data.status])}
            })
        },
        liveRoomClose(item) {
            var self = this
            if (item.status == '0') {
                var periodicalid = item.periodicalid
                layer.confirm('确定关闭直播室?', function() {
                    $.post('/broadcasting/closePeriodical.htm', { periodicalid: periodicalid }, back => {
                        if (back.status == '1') {
                            layer.msg('直播室已关闭')
                            self.render()
                        } else {
                            return layer.msg(error[back.status])
                        }
                    }, 'json')
                })

            }
        },
        onPage(page) {
            console.log('page', page)
            this.page = page
            this.render()
        }
    },
    mounted() {
        this.render()
    }
})
