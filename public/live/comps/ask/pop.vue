<template>
  <div class="iask" v-show="moduleShow">
    <div class="box">
      <div class="close" @click="closed"></div>
      <div class="contop clear" v-for="item in back.note" :key="item.id">
        <div class="text">
          {{item.questioncontent}}
        </div>
        <div class="text-bottom">
          <span class="phone">{{item.questionusername}}</span>
          <span class="time">{{item.questiontime}}</span>
          <span class="price">价格&nbsp;&nbsp;
            <span class="rmb">¥{{item.questionPrice?item.questionPrice:0}}</span>
          </span>
        </div>
      </div>
      <span class="line"></span>
      <div class="conbottom-wrap">
        <div class="conbottom" v-for="item in back.note_answer" :key="item.id">
          <div class="imgA">
            <img src="http://101.201.41.116:8080/public/images/live/a_icon.png" alt="">
          </div>
          <div class="title">
            <span class="head-portrait">
              <img :src="item.photo" alt="">
              <i class="teacher-icon"><img :src="item.type_ioc" alt=""></i>
            </span>

            <span class="name">{{item.answerusername}}</span>
            <span class="number">证书编号{{item.certificate_num}}</span>
          </div>
          <div class="list">
            <div class="content clear">
              <div class="text">
                <span v-html="item.answercontent"></span>
                <span class="time">{{item.answertime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn" v-if="!isTeacherSelf" @click="ask">我要提问</div>
      <div class="btn" v-if="isTeacherSelf" @click="answer">回复</div>

      <div id="answerWindow" v-if="isTeacherSelf" v-show="moduleAnswer">
        <div class="answerWindow-wrap">
          <div class="title">
            <div class="name">回答问题</div>
            <i class="close-window" @click="reset"></i>
          </div>
          <div class="hide question"></div>
          <div class="content">
            <script id="answerWindow-live" type="text/plain"></script>
            <div class="bottom clear">
              <button class="submit" @click="answerSubmit">提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as http from "@/api.js";
import {Message} from 'element-ui';
export default {
  data() {
    return {
      back: {},
      moduleShow:false,
      isTeacherSelf:false,
      ue:null,
      moduleAnswer: false,
      params:{
        noteid: ""
      }
    };
  },
  methods: {
    queryNoteDetail(id) {
      this.params.noteid = id;
      this.getData(this.params);
    },
    async getData(params){
      const back = await http.queryNoteDetail(params);
      this.back = back.data;
      this.moduleShow = true;
    },
    closed(){
      this.moduleShow = false;
      this.back = {};
      this.moduleAnswer = false;
      this.ue.setContent('');
    },
    ask(){
      this.$emit('submit',{ id: room_teacherid, name: room_nickName });
    },
    answer(){
      this.moduleAnswer = true;
    },
    async answerSubmit(){
      if (!this.ue.getContent().trim()) {
          Message({type:'fail',message:"回答内容不能为空"});
          return;
      }
      var send = {
          userid: ynUserId,
          answeruserid: ynTeacherId,
          answercontent: this.ue.getContent().trim(),
          answerusername: ynTeacherName,
          stock_trend: '', //0=看涨, 1=看跌,
          note_type: '',
          noteid: this.params.noteid,
          is_reply: 1,
          note_billno: '' //流水号
      };
      var back = await http.answerNote(send);
      if(back.status == 1){
        Message({type:'success',message:'回答成功'});
        this.reset();
        this.getData(this.params);
      }
    },
    reset(){
        this.ue.setContent('');
        this.moduleAnswer = false;
    }
  },
  mounted() {
    // this.queryNoteDetail();
    this.isTeacherSelf = room_teacherid  == ynTeacherId;
    if( this.isTeacherSelf){
        //编辑器初始化
        this.ue = UE.getEditor('answerWindow-live', {
            toolbars: [
                ['forecolor']
            ],
            initialFrameHeight: 130,
            elementPathEnabled: false,
            wordCount: false,
            enableContextMenu: false,
            enableAutoSave: false,
            pasteplain: true
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.iask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0,0,0,.4);
}
.box {
  width: 800px;
  height: 715px;
  padding:22px 0 0 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #ffffff;
  .close {
    width: 9px;
    height: 9px;
    background: url(/public/v2/base/images/close-icon.png);
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  .contop {
    position: relative;
    padding:0 34px 15px 34px;
    .imgQ {
      width: 20px;
      height: 20px;
      position: absolute;
      left: 29px;
      top: 35px;
    }
    .text {
      width: 697px;
      font-size: 14px;
      color: #666666;
      line-height: 24px;
      &:before{
        display:inline-block;
        content:"";
        width:20px;
        height:20px;
        background:url(/public/images/live/q_icon.png);
        position: relative;
        top:4px;
        margin-right:10px;
      }
    }
    .text-bottom {
      font-size: 12px;
      color: #999999;
      float: right;
      margin-top: 15px;
      .phone {
        margin-right: 19px;
      }
      .time {
        margin-right: 19px;
      }
      .price {
        .rmb {
          color: #dd503f;
          font-weight: bold;
          font-size: 12px;
          line-height: 22px;
        }
      }
    }
  }
  .line {
    display: block;
    border-bottom: 1px solid #e5e5e5;
  }
  .conbottom-wrap{
    height: 545px;
    overflow: auto;
  }
  .conbottom {
    width: 100%;
    .imgA {
      width: 20px;
      height: 20px;
      float: left;
      margin-left: 35px;
      margin-top: 25px;
    }
    .title {
      height: 30px;
      display: inline-block;
      margin-left: 36px;
      margin-top: 20px;
      .head-portrait {
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .teacher-icon{
          display: inline-block;
          width:12px;
          position: relative;
          left:-15px;
          img{
            width:100%;
            height:auto;
          }
        }
      }
      .name {
        width: 64px;
        height: 30px;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        position: relative;
        bottom: 10px;
      }
      .number {
        width: 170px;
        height: 30px;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
        margin-left: 10px;
        position: relative;
        bottom: 11px;
      }
    }
    .list {
      margin-top: 19px;
      .content {
        box-sizing: border-box;
        width: 744px;
        margin-left: 28px;
        padding: 20px 17px 12px 32px;
        background: #f7f7f7;
        .text {
          width: 695px;
          font-size: 14px;
          color: #666666;
          line-height: 24px;
          .time {
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            line-height: 24px;
            float: right;
          }
        }
      }
    }
  }
  .btn {
    width: 109px;
    height: 31px;
    margin: 20px auto 0 auto;
    color: #ffffff;
    text-align: center;
    line-height: 31px;
    font-size: 12px;
    background: rgba(246, 85, 74, 1);
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
