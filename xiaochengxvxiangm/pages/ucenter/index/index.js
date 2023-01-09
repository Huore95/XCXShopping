var user = require('../../../utils/user');
var api = require('../../../config/api.js');
var util = require('../../../utils/utils.js');
var app = getApp();

Page({
  data: {
    userInfo:{
      nickName:'点击登录',
      avatarUrl:'https://th.bing.com/th/id/OIP.jEXAGaEpYricbqFWbshu5gAAAA?pid=ImgDet&rs=1'
    },
    hasLogin:false
  },
    onShow: function(){
        // 获取用户的登录信息
        let userInfo = wx.getStorageSync('userInfo');
        if(userInfo){
          app.globalData.hasLogin = true;
          this.setData({
            userInfo : userInfo,
            hasLogin : true
          })
        }
      },
    goLogin(){
          // 首先判断是否登录
          if(!app.globalData.hasLogin){
            wx.navigateTo({
              url: '/pages/auth/login/login',
            })
          }
        },
    //退出登录
    exitLogin: function () {
      wx.showModal({
        title: '',
        confirmColor:'#b4282d',
        content: '退出登陆?',
        success:function (res){
           if(!res.confirm){
             return;
           }
           util.request(api.AuthLogout,{},'POST');
           app.globalData.hasLogin = false;
           wx.removeStorageSync('token');
           wx.removeStorageSync('userInfo');
           wx.reLaunch({
             url: '/pages/index/index',
           })
        }
      })
    }
})