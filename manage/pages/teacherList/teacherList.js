const initData = function() {
    return {
        page: 1,
        rows: 50,
    }
}


new Vue({
    el: '#app',
    data() {
    	return {
    		param: initData(),
		    list: [],
		    sortNo: '',
		    teacherid: '',
		    params: {
		        upTeacherid: '',
		        downTeacherid: '',
		        upSortNo: '',
		        downSortNo: ''
		    }
    	}
    },
    methods: {
        up: async function(item,index) {
        	var self = this;
            self.sortno = this.list[index - 1].sortno //上一条sortnum
            self.teacherid = this.list[index-1].teacherid//上一条teacherid
            if (!self.sortno || !self.teacherid) return
            self.params = {
                upTeacherid: item.teacherid,
                upSortNo: self.sortno,
                downTeacherid: self.teacherid,
                downSortNo: item.sortno
            }
            this.sortList(self.params)
        },
        down: async function(item,index) {
        	var self = this;
            self.sortno = this.list[index + 1].sortno //下一条sortnum
            self.teacherid = this.list[index+1].teacherid//下一条teacherid
            if (!self.sortno || !self.teacherid) return
            self.params = {
                upTeacherid: self.teacherid,
                upSortNo: item.sortno,
                downTeacherid: item.teacherid,
                downSortNo: self.sortno
            }
           this.sortList(self.params)
        },
        top: async function(item) {
            var params = {
                upTeacherid: item.teacherid,
                upSortNo: item.sortno,
                isTop: 1
            }
            this.sortList(params)
        },
        sortList: async function(params){
        	var back = await sortNumTeacher(params)
            back = JSON.parse(back)
            if (back.status == 1) {
            	this.render()
            }
        },
        render() {
            var url = path + "/teacher/teacherSortNoList.do"
            var send = _.extend(this.param)
            $.getJSON(url, send, back => {
                if (back.status != 1) {
                    return this.$message.error(back.status)
                }
                this.list = back.data
            })
        },
    },
    mounted() {
        this.render()
    }
})

const sortNumTeacher = params => new Promise(resolve => {
    $.post("/teacher/sortNoTeacher.do", params, back => resolve(back))
})


