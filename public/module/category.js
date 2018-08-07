var category = {
    goodsType: ["观点", "组合", "课程", "内参", "问股", "直播", "操盘内线"], // 商品分类
    articleType: ["大盘", "题材", "个股", "股票学堂", "操盘绝学", "独家内参"], // 文章分类
    orderType: ["充值", "打赏", "送礼物", "购买产品", "瞄一眼"], // 订单分类
}

// 转换
category.ordertype = category.orderType
category.goodstype = category.goodsType

module.exports = category
