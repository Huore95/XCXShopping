var api = require('../../config/api.js');
var util = require('../../utils/utils.js');

Page({
  data: {
       categoryList:[],//左侧分类数据
       currentCategory:{}, //当前选中的分类
       currentSubCategoryList:{}, //左侧的子分类
       goodsCount: 0, //商品数量
  },
  onLoad(options){
    this.getCatalog();
  },
  //获取一级分类和商品数量
  getCatalog:function (){
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.catalogList).then(function(res){
      that.setData({
        categoryList:res.data.categoryList,
        currentCategory:res.data.currentCategory,
        currentSubCategoryList:res.data.currentSubCategory,
      });
      wx.hideLoading();
    });
    util.request(api.GoodsCount).then(function(res){
      that.setData({
        goodsCount:res.data.goodsCount
      })
    })
  },
  //点击一级分类
  switchCate: function (event){
  var that = this;
  var currentTarget = event.currentTarget;
  if (this.data.currentCategory.id == event.currentTarget.dataset.id){
    return false;
  }
  this.getCurrentCategory(event.currentTarget.dataset.id)
  },
  //更剧分类ID获取二级分类
  getCurrentCategory: function (id){
    let that = this;
    util.request(api.catalogCurrent,{
      id: id
    }).then(function(res){
      that.setData({
        currentCategory:res.data.currentCategory,
        currentSubCategoryList:res.data.currentSubCategory
      })
    })
  },
  onPullDownRefresh(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getCatalog(); //重新获取数据
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  }
})

