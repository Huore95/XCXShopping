var api = require('../../../config/api.js');
var util = require('../../../utils/utils.js');
var app = getApp();

Page({
  data: {
    username: "",
    password: "",
  },
 bindUsernameInput: function (e){
   this.setData({
     username: e.detail.value
   });
 },
 bindPasswordInput: function (e){
  this.setData({
    password: e.detail.value
  });
},
clearInput: function(e) {
  switch (e.currentTarget.id) {
      case 'clear-username':
          this.setData({
              username: ''
          });
          break;
      case 'clear-password':
          this.setData({
              password: ''
          });
          break;
  }
},
accountLogin: function() {
  var that = this;
  if (this.data.password.length < 1 || this.data.username.length < 1) {
      wx.showModal({
          title: '错误信息',
          content: '请输入用户名和密码',
          showCancel: false
      });
      return false;
  }
  wx.request({
      url: api.AuthLoginByAccount,
      data: {
          username: that.data.username,
          password: that.data.password
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
          if (res.data.errno == 0) {
              app.globalData.hasLogin = true;
              wx.setStorageSync('userInfo', res.data.data.userInfo);
              wx.setStorage({
                  key: "token",
                  data: res.data.data.token,
                  success: function() {
                      wx.switchTab({
                          url: '/pages/ucenter/index/index'
                      });
                  }
              });
          } else {
              app.globalData.hasLogin = false;
              util.showErrorToast('账户登录失败');
          }
      }
  });
},
})