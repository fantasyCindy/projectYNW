const GOODS_TYPE = require('enum/goods-type')
const PAY_STATE = require('enum/pay-state')
const PAY_TYPE = require('enum/pay-type')
const PAY_SOURCE = require('enum/pay-source')


const initData = function() {
    return {
        startTime: "", //开始时间
        endTime: "", //结束时间
        is_inside: "", // 是否内部用户 0外部1内部
        employeecode: "", // 邀请码
        teacherid: "", //老师id
        orderType: "", //订单类型 1:打赏 2:送礼物 3:购买产品
        orderState: "", //订单状态 0未支付 1已完成 6 服务 空值为全部
        pay_source: "", //支付来源 0web 1ios 2android 3h5
        orderNum: "", //订单号
        payMode: "", //支付方式  1.支付宝 2.微信 3:IOS平台支付
        pageSize: 10,
        currentPage: 1,
        userName: ''
    }
}


/* 显示合计 */
var summation = (function() {

    var isInit = false
    var refer, reward, gift, total

    var init = function() {
        refer = $('#val-refer')
        reward = $('#val-reward')
        gift = $('#val-gift')
        total = $('#val-total')
    }

    return {
        render(data) {
            if (!isInit) {
                init()
            }
            refer.text(data.neican_price)
            gift.text(data.liwu_price)
            total.text(data.total_price)
            reward.text(data.dahsang_price)
        }
    }

})()



//获取老师数据
var getTeacher = function(callback) {
    var url = path + '/teacher/list.do'
    $.getJSON(url, back => {
        callback(back)
    })
}

/* 获取日期 */
var getDateFormat = function(date) {
    if (!date) return "";
    date = new Date(date)
    var year = date.getFullYear()
    var month = _.padStart(date.getMonth() + 1, 2, "0")
    var day = _.padStart(date.getDate(), 2, "0")
    var result = [year, month, day].join("-")
    return result
}


var cropper = require('m/ui/cropper-v1.2.js')
var crop;
/*  Main */


const warnOption = {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
}

new Vue({
    el: '#app',
    data: {
        param: initData(),
        teachers: [],
        list: [],
        total: 0,
        inputValue: ''
    },
    methods: {
        change(val) {
            console.log(val)
        },
        reset() {
            this.param = initData()
            this.render()
        },
        onPage(num) {
            this.param.currentPage = num
            this.render()
        },
        submit() {
            this.param.currentPage = 1
            this.render()
        },
        render() {
            var url = path + "/consumption/financePayorderList.do"

            var send = _.extend(this.param)
            send.startTime = getDateFormat(send.startTime)
            send.endTime = getDateFormat(send.endTime)

            $.getJSON(url, send, back => {
                if (back.status != 1) {
                    return this.$message.error(back.status)
                }

                this.total = back.data.total
                this.list = back.data.list.map(item => {

                    //内参显示风险提示与合同
                    item.contactLink = path + '/public/contractPDF/contract' + item.contractNum + '.pdf'
                    item.agreement = path + '/public/agreementPDF/agreement' + item.contractNum + '.pdf'
                    item.isRefer = item.goodsType == 3

                    item._goodsType = GOODS_TYPE[item.goodsType]
                    item.payState = PAY_STATE[item.orderState]
                    item.pay_source = PAY_SOURCE[item.pay_source]
                    item.payMode = PAY_TYPE[item.payMode]
                    return item
                })

                summation.render(back.data)
                drawPie(back.data)
            })
        },

        exportFile() { //导出
            var url = path + "/consumption/exportOrderDetail.do"
            var send = "?"
            for (var key in this.param) {
                var value = this.param[key]
                send += `&${key}=${value}`
            }
            send = send.replace("?&", "?")
            window.open(url + send)
        },

        //生成PDF
        makePDF(item) {
            $.post(path + "/pay/generatePDF.do", {
                orderid: item.orderid
            }, back => {
                if (back == "success") {
                    this.$message({ type: "success", message: "生成成功" })
                }
            })
        },
        readFile(ev, item) {
            var self = this
            var file = ev.target.files[0]
            self.inputValue = ev.target.value
            console.log("1", ev.target)
                //限定上传文件的类型，判断是否是图片类型
            if (!/image\/\w+/.test(file.type)) {
                alert("只能选择图片");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async function(e) {
                var base64Code = this.result;

                const back = await submitData(base64Code, item.orderNum)
                if (back != "success") return;
                await self.$confirm('图片上传成功，是否修改订单状态, 是否继续?', '提示', warnOption).then(async () => {
                    await conifrmOrder(item.orderNum)
                    self.render()
                    ev.target.value = ''
                    self.$message({ type: 'success', message: '修改成功!' });
                }).catch(err => {
                    ev.target.value = ''
                    self.$message({ type: 'info', message: '已取消' });
                })


            }
        }
    },
    mounted() {
        this.render()
        getTeacher(back => {
            this.teachers = back.rows
        })
    }
})


/* 绘制饼图 */
function drawPie(data) {
    var ops = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 220
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
            enabled: false
        },
        legend: {
            floating: true,
            align: "right",
            layout: 'vertical'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: '打赏',
                y: +data.dahsang_price
            }, {
                name: '礼物',
                y: +data.liwu_price,
            }, {
                name: '内参',
                y: +data.neican_price,
                sliced: true,
                selected: true
            }]
        }]
    }
    Highcharts.chart('chart-container', ops)
}


const conifrmOrder = (orderNum) => new Promise(resolve => {
    $.post('/order/orderRedfund.do', { orderNum }, back => {
        if (back == "success") {
            resolve()
        }
    })
})

const submitData = (dataImg, orderNum) => new Promise(resolve => {
    $.post("/order/uploadRefundPicture.do", {
        dataImg,
        orderNum
    }, back => resolve(back))
})
