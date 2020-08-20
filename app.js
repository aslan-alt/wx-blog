//app.js
import auth from './utils/auth'
App({
  onLaunch: function () {
    // console.log(x)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
   
  },
  
})