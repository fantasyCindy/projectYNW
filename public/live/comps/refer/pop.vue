<template>
  <div id="popup" v-show="showModule">
    <div class="popup-wall"></div>
    <div class="popup-box clear">
      <span class="close" @click="showModule=false">×</span>
      <div class="popup-title clear">
        <span class="popup-title-name" v-text="referInfo.title"></span>
        <span class="refer-time">服务周期：{{referInfo.startTime+'至'+referInfo.endTime}}</span>
        <span class="refer-status" v-show="referInfo.is_od==0" :class="['presell','hotsale','end'][referInfo.productStatus]" v-text="['服务中','热卖中','已结束'][referInfo.productStatus]"></span>
        <span v-if="referInfo.is_od==1" class="refer-count">共{{total}}条内参</span>
      </div>
      <div v-show="referInfo.is_od==0">
        <div class="popup-info clear">
          <div class="popup-img fl">
            <img :src="referInfo.photo_path" alt="">
          </div>
          <div class="popup-more fr">
            <p class="frequency">更新频率：{{referInfo.updateDay+'交易日'+referInfo.updatefrequency+'次'}}</p>
            <p class="timeStatus" v-html="timeStatus"></p>
            <p class="popup-price">订阅价：
              <span class="price">¥{{referInfo.price}}</span>
            </p>
            <span class="popup-btn fr" @click="subscription()" :class="{'end':referInfo.productStatus==2}">立即订阅</span>
          </div>
        </div>
        <div class="popup-txt">
          <p class="m-title tc">内参介绍</p>
          <div class="popup-content" v-html="referInfo.productInfo" @click="zoomImg($event)"></div>
        </div>
        <div class="popup-hint tc">
          <p class="m-title">股市有风险 入市需谨慎！</p>
          <p>用户应了解证券投资面临的各种市场风险，了解证券业务的内涵和基本规则，用户应自主作出投资决策，并独立承担投资风险。网站不承担任何经济和法律责任。</p>
        </div>
      </div>
      <div v-if="referInfo.is_od==1">
        <!-- 内参及用户评论列表 -->
        <div class="refer-info-content">
          <div class="refer-info-items">
            <div v-for="item in list" :key="item.id" class="refer_list clear">
              <span class="teacherPhoto fl"><img :src="item.teacherPhoto" alt="" />
                <i class="teacher-icon fl" v-if="item.type_ioc"><img :src="item.type_ioc" alt=""></i>
              </span>
              <span class="name fl">{{item.puiblisher}}</span>
              <span class="time fl">{{item.time}}</span>
              <div class="refer_item fl" v-html="item.content" @click="zoomImg($event)"></div>
            </div>
            <div class="tag top" @click="referTop"></div>
          </div>
          <div class="refer-comment-title">评论</div>
          <div class="refer-comment-content">
            <div class="refer-comment-items">
              <div class="refer-comment-item clear" v-for="item in commentList" :key="item.id">
                <span class="teacherPhoto fl"><img :src="item.photo_path" alt="" />
                  <i class="teacher-icon fl" v-if="item.type_ioc"><img :src="item.type_ioc" alt=""></i>
                </span>
                <span class="name fl">{{item.nickName}}
                </span>
                <span class="teacher-num fl" v-if="item.certificate_num">投顾编号：{{item.certificate_num}}</span>
                <span class="time fl">{{item.time}}</span>
                <div class="reply-list-wrap">
                  <div class="refer_item">
                    <div class="reply-info">{{item.content}}</div>
                    <div class="comment-reply clear" v-if="item.childList" v-for="child in item.childList" :key="child.id">
                      <span class="teacherPhoto fl"><img :src="child.photo_path" alt="" />
                        <i class="teacher-icon fl" v-if="child.type_ioc"><img :src="child.type_ioc" alt=""></i>
                      </span>
                      <span class="name fl">{{child.nickName}}</span>
                      <span class="teacher-num fl" v-if="child.certificate_num">投顾编号：{{child.certificate_num}}</span>
                      <div class="reply_item fl">{{child.content}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tag comment" @click="commentTop"></div>
          </div>
        </div>
        <!-- 用户输入框 -->
        <div class="user-input" v-if="!isTeacherSelf">
          <img src="../../images/shurukuang.png" v-show="input_show==false" @click="input_show=true" class="input-img">
          <div class="input-box" v-show="input_show">
            <span class="icon_close" @click="input_show=false">×</span>
            <div class="title clear">
              <i class="icon fl"></i>
              <span class="fl">发表评论</span>
            </div>
            <textarea v-model="inputTxt" class="input-text" placeholder="快来发表伟大言论吧"></textarea>
            <div class="input-operate clear tc">
              <span class="submit" @click="submit">提交</span>
              <span class="count">{{count}}/200</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//获取昨天
function getYesterday() {
	var day1 = new Date();
	day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
	var s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate();
	return s1;
}

//获取前天天
function beforeYesterday() {
	var day1 = new Date();
	day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000 * 2);
	var s1 = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate();
	return s1;
}
//日期获取毫秒数
function getSeconds(date) {
	var time = new Date(date.replace(/-/g, '/'));
	var seconds = time.getTime();
	return seconds;
}
//时间转换
function timeFormat(time) {
	//时间转换
	var strtime = time;
	var result;
	var newDate = new Date();
	var date = getSeconds(strtime);
	const sub = Date.now() - date;
	const yesterday = 1000 * 60 * 60 * 48;
	const yesterdayStart = getSeconds(getYesterday() + ' ' + '00:00:00'); //昨天开始时间
	const yesterdayEnd = getSeconds(getYesterday() + ' ' + '23:59:59'); //昨天结束时间
	const beforeyesterdayStart = getSeconds(beforeYesterday() + ' ' + '00:00:00'); //前天开始时间
	const beforeyesterdayEnd = getSeconds(beforeYesterday() + ' ' + '23:59:59'); //前天结束时间
	const thisYear = getSeconds(newDate.getFullYear() + '-01-01' + ' ' + '00:00:00'); //今年开始时间
	if (date > yesterdayEnd) {
		result = '今天' + strtime.substr(10, 6);
	} else if (date >= yesterdayStart && date <= yesterdayEnd) {
		result = '昨天' + strtime.substr(10, 6);
	} else if (date >= beforeyesterdayStart && date <= beforeyesterdayEnd) {
		result = '前天' + strtime.substr(10, 6);
	} else {
		result = strtime.substr(0, 16);
	}
	return result;
}
import * as http from "@/api";
import { Message } from "element-ui";
import differenceInDays from "date-fns/difference_in_days";
// import error from ""
export default {
  data() {
    return {
      showModule: false,
      referInfo: [],
      timeStatus: "",
      input_show: false,
      count: 0,
      inputTxt: "",
      page:1,
      row:100,
      list:[],
      commentList:[],
      referid:'',
      isTeacherSelf:false,
      total: 0
    };
  },
  watch: {
    inputTxt: function() {
      if (this.inputTxt.toString().length > 200) {
        this.inputTxt = this.inputTxt.substring(0, 200);
      }
      this.count = this.inputTxt.toString().length;
    }
  },
  methods: {
    subscription() {
      if (this.referInfo.productStatus == 2){
        return layer.msg('内参已结束，不能订阅')
      }
       this.$emit('subscribe',this.referInfo); 
    },
    async submit() {
      if (!this.inputTxt)
        return layer.msg('请输入您要说的话');
      const params = {
        reference_id: this.referInfo.id,
        content: this.inputTxt,
        parent_id: ""
      };
      var back = await http.addComment(params);
      if(back.status == 1){
        this.inputTxt = "";
        layer.msg('评论成功');
        this.input_show = false;
        this.getReferComment(this.referInfo);
      }
    },
    //   通过产品状态计算时间差
    displayTime() {
      const strategy = [
        () =>
          differenceInDays(this.referInfo.systemTime, this.referInfo.startTime),
        () =>
          differenceInDays(this.referInfo.startTime, this.referInfo.systemTime),
        () => differenceInDays(this.referInfo.endTime, this.referInfo.startTime)
      ];
      const display = strategy[this.referInfo.productStatus]();
      let time = `<font color="#eb5e55">${display}</font>`;
      const strategyTxt = [
        () => `此内参已运行${time}天`,
        () => `此内参${time}天后运行`,
        () => `此内参共运行${time}天`
      ];
      this.timeStatus = strategyTxt[this.referInfo.productStatus]();
      console.log(this.timeStatus);
    },
    async getReferInfo(id) {
      this.referid = id ? id : this.referid;
      const back = await http.getReferInfo({ id: this.referid });
      this.referInfo = back.data;
      this.showModule = true;
      this.displayTime();
      if(back.data.is_od){
        this.getReferContent(back.data);
        this.getReferComment(back.data);
      }
    },
    async getReferContent(data){
      const back = await http.getReferContent({
        referenceid:data.id,
        pageSize:this.row,
        currentPage:this.page
        });
        this.total = back.data.total;
        this.list = this.handle(back.data.list);
    },
    async getReferComment(data){
      const back = await http.getReferComment({
          type:0,
          reference_id:data.id,
          productStatus:data.status,
          pageSize:this.row,
          currentPage:this.page
      });
        this.commentList = this.handle(back.data.list);
    },
    handle: arr => {
      return arr.map(item =>{
        var timestr = item.pubtime || item.create_time;
        item.time = timeFormat(timestr);
        return item;
      })
    },
    commentTop(){
      document.getElementsByClassName('refer-comment-content')[0].scrollTop = 0;
    },
    referTop(){
      document.getElementsByClassName('refer-info-items')[0].scrollTop = 0;
    },
    zoomImg(e){
      if(e.target.src){
          hub.emit('zoom-img',e.target.src);
      }
    }
  },
  mounted() {
    this.isTeacherSelf = room_teacherid  == ynTeacherId;
    // this.getReferInfo(471);
  }
};
</script>
<style lang="scss" scoped>
#popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  .popup-wall {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
  .popup-box {
    position: absolute;
    width: 800px;
    height: 715px;
    background: #fff;
    top: 50%;
    margin-top: -357.5px;
    left: 50%;
    margin-left: -400px;
    .close {
      position: absolute;
      right: 8px;
      top: 8px;
      font-size: 20px;
      cursor: pointer;
    }
    .popup-title {
      height: 68px;
      line-height: 68px;
      border-bottom: 1px solid #e5e5e5;
      padding-left: 28px;
      .popup-title-name {
        font-size: 18px;
        color: #d72721;
        font-weight: bold;
        margin-right: 10px;
      }
      .refer-time {
        font-size: 14px;
        color: #666666;
        margin-right: 20px;
      }
      .refer-count{
        font-size: 14px;
        color: #999999;
        float:right;
        margin-right: 33px;
      }
      .refer-status {
        display: inline-block;
        width: 57px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        &.presell {
          background: #ebae06 url(../../images/status_icon.png) no-repeat;
        }
        &.hotsale {
          background: #ff3a4c url(../../images/status_icon.png) no-repeat;
        }
        &.end {
          background: #cccccc url(../../images/status_icon.png) no-repeat;
        }
      }
    }
    .popup-info {
      margin: 0 28px;
      padding: 20px 0;
      border-bottom: 1px solid #e5e5e5;
      .popup-img {
        width: 165px;
        height: 165px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .popup-more {
        width: 550px;
        position: relative;
        line-height: 54px;
        .frequency {
          font-size: 18px;
          color: #666666;
        }
        .timeStatus {
          font-size: 16px;
          color: #666666;
        }
        .popup-price {
          font-size: 16px;
          color: #666666;
          .price {
            font-size: 24px;
            color: #d72721;
          }
        }
        .popup-btn {
          position: absolute;
          right: 0;
          top: 60px;
          display: inline-block;
          width: 150px;
          height: 38px;
          text-align: center;
          line-height: 38px;
          font-size: 16px;
          color: #fff;
          border-radius: 5px;
          background: #eb5e55;
          cursor: pointer;
          &.end {
            background: #cccccc;
          }
        }
      }
    }
    .popup-txt {
      margin: 20px 28px;
      height: 271px;
      overflow-y: auto;
      background: #f5f5f5;
      .m-title {
        font-size: 18px;
        color: #d72721;
        font-weight: bold;
        padding: 15px 0;
      }
      .popup-content {
        width:734px;
        font-size: 14px;
        line-height:24px;
        color: #666666;
        padding: 0 28px 28px;
        word-break: normal;
        white-space: normal;
         p img{
            width:90% !important;
          }
      }
    }
    .popup-hint {
      height: 110px;
      margin: 20px 28px;
      background: #fff9e9 url(../../images/warn.png) center center no-repeat;
      font-size: 16px;
      color: #d98625;
      padding: 10px 50px;
      line-height: 30px;
      box-sizing: border-box;
      .m-title {
        font-size: 18px;
      }
    }
    .user-input {
      position: absolute;
      bottom: 0;
      width: 100%;
      .input-img {
        display: block;
        cursor: pointer;
      }
      .input-box {
        height: 276px;
        padding: 16px 27px;
        background: rgba(242, 242, 242, 1);
        border-radius: 4px;
        box-sizing: border-box;
        box-shadow: 10px 0 8px rgba(6, 13, 36, 0.36);
        .icon_close {
          position: absolute;
          right: 14px;
          top: 8px;
          font-size: 22px;
          cursor: pointer;
          color: rgba(179, 179, 179, 1);
        }
        .title {
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;

          .icon {
            display: inline-block;
            width: 4px;
            height: 15px;
            background: rgba(221, 80, 63, 1);
            border-radius: 2px;
            margin-right: 8px;
            position: relative;
            top: 1px;
          }
        }
        .input-text {
          margin: 10px 0 16px;
          width: 100%;
          height: 171px;
          background: #fff;
          border: 1px solid #e0dfdf;
          min-height: 171px;
          max-height: 171px;
          min-width: 100%;
          max-width: 100%;
          outline: none;
          font-size: 14px;
          line-height: 24px;
          padding: 19px 11px;
          box-sizing: border-box;
          &::-webkit-input-placeholder {
            color: rgba(153, 153, 153, 1);
          }
        }
        .input-operate {
          .submit {
            display: inline-block;
            width: 80px;
            height: 31px;
            background: rgba(246, 85, 74, 1);
            border-radius: 4px;
            font-size: 14px;
            color: #fff;
            line-height: 31px;
            cursor: pointer;
            text-align: center;
          }
          .count {
            position: absolute;
            right: 27px;
            line-height: 31px;
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
            margin-top: -1px;
          }
        }
      }
    }
  }
}
.refer-info-content{
    margin: 15px 30px;
      position: relative;
    .refer-info-items{
      height:316px;
      background: #efefef;
      overflow: auto;
      padding:5px 15px;
       .refer_list {
      line-height: 25px;
      padding: 20px 0;
      .teacherPhoto {
      display: inline-block;
      margin-right: 12px;
      position: relative;
      top: -2px;
        img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .teacher-icon{
        width:12px;
        position:absolute;
        right:2px;
        bottom:0;
        img{
          width:100% !important;
          height:auto !important;
        }
      }
    }
    .name {
        display: inline-block;
        margin-right: 10px;
        font-size: 16px;
    }
    .time {
      color: #666;
      font-size: 12px;
      float: right;
    }
    .refer_item {
        width: 94%;
        padding: 10px;
        margin-top: 15px;
        background: #FFF8F7;
        font-size: 14px;
        line-height: 24px;
        color: #666;
        border-radius:0px 4px 4px 4px;
          img {
          cursor: pointer;
          border: 1px solid #e1e1e1;
          border-radius: 3px;
          margin: 5px;
          display: block
        
        }
        
      }
    }
  }
 
}
.refer-comment-title{
      font-size:18px;
      padding:15px 0;
      color:#333;
      border-bottom:1px solid #ececec;
      &:before{
        display:inline-block;
        content:"";
        width:4px;
        height:17px;
        background:#DD503F;
        margin-right: 10px;
        position: relative;
        top: 2px;
        border-radius: 2px;
      }
    }
.refer-comment-content{
    margin: 5px 0;
    height: 216px;
    overflow: auto;
    .refer-comment-item{
      padding:15px;
      .teacherPhoto {
      display: inline-block;
      margin-right: 12px;
      position: relative;
      top: -2px;
        img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .teacher-icon{
        width:12px;
        position:absolute;
        right:2px;
        bottom:0;
        img{
          width:100% !important;
          height:auto !important;
        }
      }
    }
    .name {
        display: inline-block;
        margin-right: 10px;
        font-size: 16px;
        position:relative;
        top:5px;
        color:#333;
    }
    .time {
      color: #666;
      font-size: 12px;
      float: right;
      position:relative;
      top:5px;
      }
      .reply-list-wrap{
        margin-top:20px;
         .refer_item{
        display: inline-block;
        max-width: 94%;
        padding:0 10px 10px;
        margin-top: 15px;
        background: whitesmoke;
        font-size: 14px;
        line-height: 22px;
        border-radius: 0px 4px 4px 4px;
        color: #666;
      &:before{
        display: inline-block;
        content:"";
        width: 12px;
        height: 7px;
        background: url(/public/live/images/jiao_hui.png);
        position: relative;
        top: -7px;
        left: -16px;
        }
      .comment-reply{
        background:#fff;
        border-radius:0px 4px 4px 4px;
        padding:5px;
        margin-top:10px;
      .teacherPhoto {
      display: inline-block;
      margin-right: 12px;
      position: relative;
      top: -2px;
        img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .teacher-icon{
        width:12px;
        position:absolute;
        right:2px;
        bottom:0;
        img{
          width:100% !important;
          height:auto !important;
        }
      }
    }
          .name {
              display: inline-block;
              margin-right: 10px;
              font-size: 16px;
              position:relative;
              top:5px;
              color:#000;
              font-weight:0;
          }
            .teacher-num{
              font-size:14px;
              color:#999;
              position: relative;
              top:5px;
              }
            .reply_item {
              width: 100%;
              margin-top: 5px;
              font-size: 14px;
              line-height: 24px;
              color: #666;
          }
        }
      }
    }
   }
}
.teacher-num{
  color:#999;
  font-size:14px;
  position:relative;
  top:5px;
}
.top{
  width:53px;
  height:31px;
  background:url(/public/live/images/top.png);
  position: absolute;
  right:-83px;
  top:0;
  cursor: pointer;
}
.comment{
  width:53px;
  height:31px;
  background:url(/public/live/images/pinglun.png);
  position: absolute;
  right:-83px;
  bottom:280px;
  cursor: pointer;
}
</style>

