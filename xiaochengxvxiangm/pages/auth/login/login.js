var api = require('../../../config/api.js');
var util = require('../../../utils/utils.js');

//获取应用实例
var app = getApp()
 
Page({
   wxLogin: function (e){
     if(e.detail.userInfo == undefined){
       app.globalData.hasLogin = false;
       util.showErrorToast('微信登陆失败');
       return;
     }
     user.checkLogin().catch(()=>{
       user.loginByWeixin(e.detail.userInfo).then(res => {
        app.globalData.hasLogin = true;
        wx.navigateBack({
          delta:1
        })
       }).catch(() => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登陆失败');
       })
     })
   },
   accountLogin: function (){
     wx.navigateTo({
       url: "/pages/auth/accountLogin/accountLogin"
     })
   }

})
 