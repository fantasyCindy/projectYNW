<template>
  <div>
    <div class="interaction" :class="style">
      <div class="friendTalk">
        <div class="title">
          <span class="title-icon"></span>
          <span class="txt">股友互动</span>
          <span class="voice">
            <i class="icon-sound" :class="enableAudio?'up':'down'" @click="audio">
              <audio src=""></audio>
            </i>
          </span>
        </div>
        <div class="items">
          <span class="loadMore" @click="loadMore" v-show="loadMoreShow">
            点击查看更多股友互动
          </span>
          <div class="item" v-for="item in chatList" :key="item.id">
            <div class="time">
              <p>{{item._time}}</p>
            </div>
            <div class="line1">
              <div class="avatar">
                <img :src="item._photo" alt="">
                <span v-if="item._isTeacher" class="vip">
                  <img :src="item.type_ioc" alt="">
                </span>
              </div>
              <span class="name">{{item.nickName}}</span>
              <span class="user_type">
                <i class="item-icon-anchor" v-if="item._isTeacher == 'isTeacher'">
                  <img src="@/images/zhubo.png" alt="">
                </i>
              </span>
            </div>
            <div class="line2">
              <span class="qipao" :class="item._isTeacher"></span>
              <div class="pubContent" :class="item._isTeacher">
                <span class="delete-chat" v-if="isTeacherSelf && !ishistory" @click="del(item)"></span>
                <span v-html="item._content"></span>
                <div class="inside" v-if="item.replyList" v-for="rep in item._replyList" :key="rep.id">
                  @{{rep.nickName}} :
                  <span v-html="rep._content"></span>
                </div>
              </div>
            </div>
            <div class="line3 clear">
              <span v-if="!isTeacherSelf" class="reply" @click="reply(item)" :class="{hide:(item.replyList.length != 0 || !item._isTeacher || ishistory)}">回复</span>
              <span v-if="isTeacherSelf" class="reply" @click="reply(item)" :class="{hide:(item.replyList.length != 0 || item._isTeacher || ishistory)}">回复</span>
              <select @change="banned(item)" v-model="dayCount" name="" id="" v-if="isTeacherSelf" class="banned" :class="{hide:(item.replyList.length != 0 || item._isTeacher || ishistory)}">
                <option value="0">禁言</option>
                <option value="1">禁言1天</option>
                <option value="-1">永久禁言</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div id="talkWindow" v-if="!ishistory">
        <div class="content" v-if="!isbanned">
          <div class="replyBox" :class="showReplyBox>0?'show':'hide'">
            <span class="text" ref="text"></span>
            <span class="close" @click="close">×</span>
          </div>
          <textarea ref="textarea" maxlength="200" @input="descInput" @focus="focus" v-model="desc" placeholder="与股友多交流，学习更多炒股技巧">
          </textarea>

          <div class="footer clear">
            <span class="face" id="face-trigger" @click.stop="face"></span>
            <span class="insertStock"><input type="text" placeholder="插入股票" id="insertStock"></span>
            <span class="wordCount">
              <span class="value">{{remnant}}</span>/200</span>
            <button class="btn submit" type="button" @click="submit">提交</button>
          </div>
        </div>
        <div class="content" v-if="isbanned">
          <div class="bannedtype" v-if="bannedtype == 1">
            <div class="text">您于
              <span class="time">{{bannedtime}}</span>被禁言</div>
            <div class="text">24小时之后自动解禁</div>
          </div>
          <div class="bannedtype" v-if="bannedtype == '-1'">
            <div class="text">您已被永久禁言</div>
            <div class="appeal" @click="isAppeal">禁言申诉</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var Face = require('m/qqface/main.js');
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


function handle(arr){
      return arr.map(item => {
        item._replyList = item.replyList ? handle(item.replyList) : '';
        item._reply = item.replyInteraction ? `@${item.replyInteraction.nickName}` : ``; // 是否显示回复
        item._isTeacher = room_nickName == item.nickName ? 'isTeacher' : ""; // 是否为老师发言
        item._isSelf = item.nickName == ynUserName ? 'isSelf' : ""; // 是否为自己的发言
        item._photo = item.photo || item.photoImg;
        item._time = timeFormat(item.showTimeStr || item.ctime);
        // item._time = 0
            // 解析表情符
            item._content = item.content.replace(/\[.+?\]/g, match => {
                var name = Face.getInstance().titleToName(match)
                if (!name) return match;
                var src = `/public/module/qqface/png/${name}@2x.png`
                return `<img class="img-qqface" src="${src}" style="position:relative;top:4px" title="${match}" >`
            })

            // item._avatar = (type == "push" ? item.photo : item.photoImg) || '/public/images/yn.jpg' //没有则指定默认头像

            return item;
      })
    }
// //历史期刊ID
var historyId = (function() {
	var match = window.location.href.match(/periodical=([0-9]+)/);
	return match ? match[1] : periodicalid;
})();

import * as http from "@/api.js";
import {Message} from 'element-ui';
export default {
  data() {
    return {
      showSelBox: 0,
      showReplyBox: 0,
      chatList: [],
      remnant: 200,
      row:10,
      desc: "",
      id:'',
      open: !open,
      selFace: "表情",
      list: [],
      params:{
        content: '',
        prId: '',
        parentid: -1
      },
      isTeacherSelf:false,
      send:{},
      loadMoreShow:true,
      ishistory:false,
      style:null,
      isbanned:false,
      dayCount:0,
      bannedtype: null,
      bannedtime: null,
      msn:null,
      enableAudio:true
    };
  },
  filters: {
    format: function() {}
  },
  methods: {
    async interaction(ops) {
      this.send = Object.assign({
            currentPage: 1,
            pageSize: this.row,
            periodicalid: this.id
        },ops);
      const back = await http.interactionList(this.send);
      if(back.data.length < this.row){
        this.loadMoreShow = false;
      }
      this.chatList = back.data;
      this.chatList = handle(this.chatList).reverse();
    },
    descInput() {
      var txtVal = this.desc.length;
      this.remnant = 200 - txtVal;
    },
    focus(){
      if(!ynIsLogin) return yn.login.render();
    },
    async submit() {
      var content = this.$refs.textarea.value.trim();
      if(content.length < 3){
        return layer.msg('至少三个字');
      }else if(content.length > 200){
        return layer.msg('最多200字');
      }
      this.params.content = content;
      this.params.prId = this.id;
      var back = await http.interactionComm(this.params);
      console.log("=backback=",back);
      if(back.status == 1){
        layer.msg('发布成功');
        this.$refs.textarea.value = '';
        this.desc = '';
        this.close();
      }else if(back.status == 80000){
        layer.msg('您已被禁言');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    reply(item) {
      this.showReplyBox = 1;
      this.$refs.text.innerText = "@" + item.nickName + ":";
      this.params.parentid = item.id;
    },
    close() {
      this.showReplyBox = 0;
    },
    async loadMore() {
        const send = {
          periodicalid:periodicalid,
          id:this.chatList[0].id,
          pageSize: this.row
        }
        var back = await http.getInteractionMore(send);
        if(back.data.list.length < this.row){
          this.loadMoreShow = false;
          layer.msg('已加载全部');
        }
        back = handle(back.data.list).reverse();
        this.chatList = back.concat(this.chatList);
    },
    chatPush(data){
      this.enableAudio ? this.msn.play() : () => f;
      data.replyList = [];
      this.chatList.push(data);
      this.chatList = handle(this.chatList);
    },
    audio(){
      this.enableAudio = !this.enableAudio
    },
    del(item){
      const _this = this;
      console.log('item',item)
      layer.confirm('确定删除这条互动吗',async function(){
        var id = item.id || item.dataId;
        var back = await http.delInteraction({
						pid: periodicalid,
						ids: id
          });
        if(back.status == 1){
          layer.msg('删除成功');
          _this.interaction();
        }
      })
    },
    face(){
      Face.getInstance().render('face-trigger', (title) => {
			this.desc = this.desc + title;
      });
      return false;
    },
    banned(item){
      const _this = this;
      console.log(item);
      if(this.dayCount == 0) return;
      const text = {
        1: '禁言1天',
        '-1': '永久禁言'
      };
      layer.confirm ('确定'+text[this.dayCount]+'该用户吗', async ()=>{
         const back = await http.banned({userid: item.user_id,bannedDay:_this.dayCount})
         if(back.status !=1){
           layer.msg('该用户已被禁言，不能重复操作');
           return;
         }
         layer.msg('禁言成功');
         this.dayCount = 0;
      })
    },
    async isAppeal(){
      const back = await http.isAppeal();
      if(back.status == 1){
        layer.msg('已申诉')
      }else{
        layer.msg('禁言已解除');
        setTimeout(() => {
          this.isbanned = false;
        }, 1000);
      }
    },
  },

  async mounted() {
    this.msn = new Audio('/public/media/msn_msg.mp3');
    this.id = periodicalid;
    var isOffline = teacher_isOffline == '-1';
    this.ishistory = (historyId && historyId != periodicalid) || isOffline;
    this.ishistory ? this.interaction({periodicalid:historyId}) : this.interaction();
    this.isTeacherSelf = room_teacherid  == ynTeacherId;
    if(this.ishistory){
      this.style = 'history';
    }else if(!this.ishistory && this.isTeacherSelf){
      this.style = 'living';
    }else{
      this.style = '';
    }
    // 查询禁言
    if(ynIsLogin && !this.isTeacherSelf){
        const back = await http.isBanned();
        console.log('back',back)
        if(back.status == 1){
          this.isbanned = back.data == 1 ? false : true;
          this.bannedtype = back.data == 1 ? null : back.data.bannedDay;
          this.bannedtime = back.data == 1 ? null : back.data.createTime;
        }
    }
  }
};
</script>
<style lang="scss" scoped>
.interaction {
  float: right;
  width: 360px;
  // min-height: 200px;
  position: relative;
  background:#fff;
    border: 1px solid #ececec;
  .show {
    display: block;
  }
  .hide {
    display: none;
  }
  .friendTalk {
    .title {
      padding: 0 12px;
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      box-sizing: border-box;
      border: 1px solid#D6D7DC;
      .title-icon {
        display: inline-block;
        width: 3px;
        height: 20px;
        background: #d72721;
        position: relative;
        top: 4px;
        margin-right: 8px;
      }
      .txt {
        width: 70px;
        height: 19px;
        color: rgba(51, 51, 51, 1);
        line-height: 46px;
      }
      .icon-sound {
        width: 14px;
        height: 14px;
        position: absolute;
        right: 18px;
        top: 20px;
      }
      .up {
        background: url("/public/live/images/shengyin_sel.png");
      }
      .down {
        background: url("/public/live//images/shengyin_nor.png");
      }
    }
    //
    .items {
      height:479px;
      overflow: scroll;
      border:1px solid rgb(220,220,220);
      border-top:none;
      .loadMore {
        display: inline-block;
        width: 100%;
        height: 26px;
        font-size: 12px;
        text-align: center;
        line-height: 26px;
        color: #990000;
        background: rgba(248, 211, 178, 1);
        cursor: pointer;
      }
      .item {
        padding: 10px 15px 12px 12px;
        .time {
          width: 77px;
          height: 20px;
          margin: 10px auto;
          background: rgba(240, 251, 255, .3);
          p {
            text-align: center;
            font-size: 12px;
            line-height: 20px;
            color: rgba(102, 102, 102, 1);
          }
        }
        .line1 {
          .avatar {
            width: 30px;
            height: 30px;
            border: none;
            float: left;
            position:relative;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
            .vip{
              width:12px;
              position:absolute;
              left:0;
              top:0;
            }
          }
          .name {
            display: inline-block;
            height: 14px;
            font-size: 14px;
            color: rgba(51, 51, 51, 1);
            position: relative;
            top: 2px;
            margin-left: 10px;
          }
          .item-icon-anchor {
            width: 38px;
            height: 16px;
            position: relative;
            top: 5px;
          }
        }
        .line2 {
          position: relative;
          margin-top: 10px;
          margin-left: 40px;
          .pubContent {
            padding: 11px 10px;
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
            background-size: auto;
            background: #F5F5F5;
            line-height: 22px;
            position: relative;
            word-break: break-all;
            word-wrap: break-word;
            .delete-chat{
              display:inline-block;
              width:12px;
              height:12px;
              background:url(/public/images/live/cha.png);
              position: absolute;
              right:0;
              top:-27px;
            }
            .inside {
              margin-top: 9px;
              padding: 6px 7px;
              background: #ffffff;
              border: 1px solid #e9eaec;
            }
          }
          .pubContent.isTeacher{
            background: #fff8f7;
          }
          .qipao {
            display: inline-block;
            width:12px;
            height:7px;
            background:url(/public/live/images/jiao_hui.png);
            position: relative;
            top: 0;
            left: -5px;
          }
          .qipao.isTeacher {
            display: inline-block;
            width:12px;
            height:7px;
            background:url(/public/live/images/jiao.png);
            position: relative;
            top: 0;
            left: -5px;
          }
        }
        .line3 {
          width: 100%;
          .reply {
            float: right;
            margin-top: 10px;
            width: 24px;
            height: 21px;
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            line-height: 22px;
            cursor: pointer;
          }
          .banned{
            float:right;
            width:80px;
            height:23px;
            border:1px solid #d4d4d4;
            color:#666;
            position:relative;
            top:10px;
            right:10px;
            cursor: pointer;
          }
        }
      }
    }
  }
  #talkWindow {
    background: white;
    margin: 0;
    padding: 0;
    position: relative;
    border-top: none;
    title {
      padding-top: 20px;
      padding-bottom: 0 !important;
      background: white !important;
      overflow: hidden;
      span {
        font-size: 17px;
        color: #d12f2f;
        text-align: left;
        margin: 0;
        display: inline-block;
        width: 100%;
        margin-left: 17px;
        padding-left: 15px;
      }
    }
    .content {
      width: 100%;
      position: relative;
      textarea {
        width: 100%;
        height:127px;
        border-style: none;
        outline: none;
        border: 1px solid #ececec;
        resize: none;
        display: block;
      }
      .replyBox {
        position: absolute;
        top: 15px;
        width: 326px;
        height: 23px;
        text-align: 20px;
        background: #ccc;
        .text {
          line-height: 23px;
          margin-left: 10px;
          font-size: 10px;
        }
        .close {
          width: 20px;
          height: 23px;
          font-size: 20px;
          font-weight: bold;
          line-height: 21px;
          float: right;
          cursor: pointer;
        }
      }
      .footer {
        // overflow: hidden;
        position: relative;
        .insertStock {
          position: absolute;
          top: 7px;
          left: 30px;
          input{
            width: 90px;
            height: 30px;
            padding-left:5px;
          }
        }
        .wordCount {
          position: absolute;
          right: 90px;
          top: 16px;
          color: #999;
          font-size: 14px;
          .value {
            padding-right: 2px;
            color: #999;
          }
        }
        .face{
          display: inline-block;
          width: 22px;
          height: 22px;
          background: url(/public/icons/face/huanglianwx_org.gif) no-repeat;
          float: left;
          cursor: pointer;
          position: relative;
          top: 12px;
          left: 0;
        }
        .submit {
          width: 70px;
          height: 30px;
          float: right;
          margin-top: 7px;
          text-align: center;
          color: white;
          background: #d72721;
          outline: none;
        }
      }
    }
  }
}

.interaction.history{
  .friendTalk{
    .items{
      height:675px;
      border:1px solid rgb(220,220,220);
      border-top:none;
    }
  }
}
.interaction.living{
  .friendTalk{
    .items{
      height:774px;
      border:1px solid rgb(220,220,220);
      border-top:none;
    }
  }
}
.bannedtype{
  width: 100%;
  height: 164px;
  text-align: center;
  background: #f5f5f5;
  padding-top:50px;
  .text{
    margin-bottom:20px;
    .time{
      display:inline-block;
      margin:0 5px;
      color:#DD503F;
    }
  }
  .appeal{
      background: #DD503F;
      color: #fff;
      width: 150px;
      height: 30px;
      line-height:29px;
      border-radius: 4px;
      margin: 25px auto;
      cursor: pointer;
  }
}
</style>





