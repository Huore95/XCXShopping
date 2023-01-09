const api = require('../../config/api.js');
const util = require('../../utils/utils.js');
Page({
  data: {
    newGoods:[],//新品首发
    hotGoods:[],//人气推荐
    topics:[],//专题精选
    brands:[],//品牌制造商
    groupons:[],//团购专区
    floorGoods:[],//从居家开始的层级数据(二维数组)
    banner:[],//轮播图数据
    channel:[],//九宫格数据
    coupon:[],//优惠券
    goodsCount:0//商品搜索,共XX款好物(搜索框)
  },
  //调用接口获取相关的数据
 getIndexData:function(){
   let that = this;
   util.request(api.IndexUrl).then(function(res){
     if(res.errno === 0) {
       that.setData({
          newGoods:res.data.newGoodsList,//新品首发
          hotGoods:res.data.hotGoodsList,//人气推荐
          topics:res.data.topicList,//专题精选
          brands:res.data.brandList,//品牌制造商
          groupons:res.data.grouponList,//团购专区
          floorGoods:res.data.floorGoodsList,//从居家开始的层级数据(二维数组)
          banner:res.data.banner,//轮播图数据
          channel:res.data.channel,//九宫格数据
          coupon:res.data.couponList,//优惠券
       })
     }
   })
   util.request(api.GoodsCount).then(function(res){
     that.setData({
       goodsCount:res.data.goodsCount
     })
   })
 },

 onLoad:function(options){
   this.getIndexData();
 }
 
})