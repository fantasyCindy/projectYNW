<template>
  <div>
    <div class="iask">
      <div class="box">
        <div class="close">×</div>
        <div class="contop" v-for="item in back.note">
          <div class="imgQ">
            <img src="http://101.201.41.116:8080/public/images/live/q_icon.png" alt="">
          </div>
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
        <div class="conbottom" v-for="item in back.note_answer">
          <div class="imgA">
            <img src="http://101.201.41.116:8080/public/images/live/a_icon.png" alt="">
          </div>
          <div class="title">
            <span class="head-portrait">
              <img :src="item.photo" alt="">
            </span>
            <span class="name">{{item.answerusername}}</span>
            <span class="number">证书编号{{item.certificate_num}}</span>
          </div>
          <div class="list">
            <div class="content">
              <div class="text">
                {{item.answercontent}}
                <span class="time">{{item.answertime}}</span>
              </div>

            </div>
          </div>
        </div>
        <div class="btn">我要提问</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as http from "@/api.js";
export default {
  data() {
    return {
      back: {}
    };
  },
  methods: {
    async queryNoteDetail() {
      const params = {
        noteid: 1943
      };
      const back = await http.queryNoteDetail(params);
      this.back = back;
      console.log(back);
    }
  },
  mounted() {
    this.queryNoteDetail();
  }
};
</script>
<style lang="scss" scoped>
.iask {
  // display: none;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #ccc;
}
.box {
  width: 800px;
  height: 715px;
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
    font-size: 14px;
    color: #666666;
    float: right;
    margin: 8px;
  }
  .contop {
    height: 164px;
    position: relative;
    .imgQ {
      width: 20px;
      height: 20px;
      position: absolute;
      left: 29px;
      top: 35px;
    }
    .text {
      width: 697px;
      height: 85px;
      font-size: 14px;
      color: #666666;
      line-height: 24px;
      position: absolute;
      top: 30px;
      right: 45px;
    }
    .text-bottom {
      font-size: 12px;
      color: rgba(153, 153, 153, 1);
      position: absolute;
      bottom: 19px;
      right: 45px;
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
  .conbottom {
    width: 100%;
    height: 550px;
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
      }
      .name {
        width: 64px;
        height: 30px;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        margin-left: 10px;
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
      height: 410px;
      overflow: scroll;
      .content {
        box-sizing: border-box;
        width: 744px;
        margin-left: 28px;
        padding: 20px 17px 20px 32px;
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
            margin-top: 15px;
          }
        }
      }
    }
  }
  .btn {
    width: 109px;
    height: 31px;
    margin: 0 auto;
    position: relative;
    bottom: 50px;
    color: #ffffff;
    text-align: center;
    line-height: 31px;
    font-size: 12px;
    background: rgba(246, 85, 74, 1);
    border-radius: 4px;
  }
}
</style>
