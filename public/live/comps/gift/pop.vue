<template>
  <!-- <div id="gift" v-show="showModule"> -->
  <!-- <div class="giftPopup" @click="showModule=false"></div> -->
  <div class="gift-wrap" v-show="showModule">
    <div class="gift-list clear">
      <div v-for="(item,index) in giftList" :class="{'active':isChoose==index}" class="items fl tc" :key="index" @click="togglePay(item,index)">
        <div class="gift-img">
          <img :src="item.photo_path" :alt="item.gift_name">
        </div>
        <div class="gift-info">
          <p class="gift-txt">{{item.gift_name}}</p>
          <p class="gift-price">¥{{item.gift_price}}</p>
        </div>
      </div>
    </div>
    <div class="gift-send clear">
      <span class="gift-txt fl">数量</span>
      <div class="counter clear fl">
        <span class="items minus fl" @click="minus">-</span>
        <input type="tel" class="items count fl" v-model="gift.count" @change="editNum" />
        <span class="items plus fl" @click="plus">+</span>
      </div>
      <span class="gift-v-price fl">
        共需
        <span class="price red" v-text="gift.price"></span>
        牛币
      </span>
      <span class="submit fl" @click="submit">立即赠送</span>
      <span class="submit close fr" @click="showModule = false">关闭</span>
      <span class="fl tip">赠送无悔，概不退款</span>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import * as http from "@/api";
import { Message } from "element-ui";
export default {
  data() {
    return {
      showModule: false,
      giftList: [],
      gift: {
        giftid: null,
        count: 1,
        price: 0,
        unitPrice: 0 //礼品单价（不包括数量）
      },
      isChoose: null
    };
  },
  methods: {
    reset(){
      this.isChoose=null;
      this.gift = {
        giftid: null,
        count: 1,
        price: 0,
        unitPrice: 0 //礼品单价（不包括数量）
      };
    },
    //   获取礼物列表
    async getGiftList() {
      const back = await http.getGiftList();
      this.reset();
      this.giftList = back.data;
      this.showModule = true;
    },

    //增加礼品数量
    plus() {
      this.gift.count++;
      this.totalPrices();
    },
    // 输入礼品数量
    editNum() {
      const count = Number(this.gift.count);
      if (!this.gift.count || this.gift.count < 1 || !count) {
        this.gift.count = 1;
      }
      this.totalPrices();
    },
    // 减少礼品数量，不低于1
    minus() {
      this.gift.count == 1 ? 1 : this.gift.count--;
      this.totalPrices();
    },
    // 计算总价
    totalPrices() {
      this.gift.price = this.gift.count * this.gift.unitPrice;
    },
    // 选择礼物
    togglePay(item, index) {
      this.isChoose = index;
      this.gift.giftid = item.gift_id;
      this.gift.unitPrice = item.gift_price;
      this.totalPrices();
    },
    async submit() {
      if (!this.gift.giftid)
        return layer.msg('请选择礼物');
      const data = {
        pay_source: 0,
        goodsType: 5,
        buy_number: Number(this.gift.count),
        giftId: Number(this.gift.giftid),
        teacherId: 15,
        sum: Number(this.gift.unitPrice)
      };
      const back = await http.getGiftData(data);
      this.$emit('submit',back.data);
      this.showModule = false;
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
.gift-wrap{
    width:100%;
    box-sizing: border-box;
    -webkit-user-select: none;
    user-select: none;
    position:absolute;
    bottom:0;
    left:0;
    background:#fff;
    z-index:0;
    padding: 10px 11px 0 11px;
    box-shadow: -2px 2px 20px rgba(0, 0, 0, .3);
  .gift-list {
    .items {
      border: 2px solid transparent;
      box-sizing: border-box;
      cursor: pointer;
      padding-top:10px;
      margin-bottom:5px;
      overflow: visible !important;
      transition: .3s all;
      img{
        height:65px;
        margin:0 8px;
        cursor: pointer !important;
      }
      .gift-info {
        width:100%;
        height: 39px;
        font-size: 14px;
        line-height: 18px;
        padding-top: 3px;
        box-sizing: border-box;
        p{
          text-align:center !important;;
        }
        .gift-txt {
          color: #666666;
        }
        .gift-price {
          color: #f6554a;
        }
      }
      &.active,
      &:hover {
        border: 2px solid #d72721;
        .gift-info {
          background: #feede4;
        }
      }
    }
  }

  .gift-send {
    border-top: 1px solid #e9eaec;
    height: 50px;
    line-height: 50px;
    padding-left: 8px;
    .gift-txt {
      font-size: 18px;
      color: #333333;
    }
    .counter {
      border: 1px solid #dfdfdf;
      height: 28px;
      line-height: 28px;
      margin: 10px;
      text-align: center;
      .items {
        border-left: 1px solid #dfdfdf;
        &:first-child {
          border-left: none;
        }
        &.minus {
          width: 29px;
          line-height: 24px;
          color: #dfdfdf;
          cursor: pointer;
          font-size: 19px;
          font-weight: bold;
          &:hover {
            color: #666666;
          }
        }
        &.count {
          width: 51px;
          height: 100% !important;
          font-size: 18px;
          color: #999999;
          outline: none;
          background: #fff;
          border: none;
          box-sizing: border-box;
          text-align: center;
          border-left: 1px solid #dfdfdf;
        }
        &.plus {
          width: 29px;
          line-height: 24px;
          color: #dfdfdf;
          cursor: pointer;
          font-size: 19px;
          font-weight: bold;
          &:hover {
            color: #666666;
          }
        }
      }
    }
    .gift-v-price {
      font-size: 14px;
      color: #333333;
      .price {
        color: #ea544a;
      }
    }
    .submit {
      background: #d72721;
      width: 92px;
      height: 34px;
      color: #fff;
      font-size: 16px;
      line-height: 34px;
      margin: 8px 17px 8px 58px;
      border-radius: 2px;
      cursor: pointer;
      text-align: center;
      &.close{
        width:70px;
        height:30px;
        line-height:29px;
        background:#fff;
        border:1px solid #d72612;
        color:#d72612;
        transition: .3s all;
        font-size:14px;
        margin-right:0;
        &:hover{
          background:#d72612;
          color:#fff;
        }
      }
    }
    .tip {
      font-size: 12px;
      color: #999999;
    }
  }
}


</style>
