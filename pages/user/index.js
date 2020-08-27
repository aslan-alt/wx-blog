// pages/user/index.js
import auth from '../../utils/auth'

const app = getApp();
Page({
  data:{
    wxUserInfo:null,
    userInfo:null,
    show:false,
    popipStyle:"height: 20%;display:flex;justify-content: center; align-items: center;color:#27A899"
  },
  onShow(){
    this.setData({wxUserInfo:wx.getStorageSync("wxUserInfo")})
    this.setData({userInfo:wx.getStorageSync("userInfo")})
    console.log(this.data.userInfo)
    if(this.data.userInfo.data && this.data.userInfo.data.isLogin){
      console.log('已登录')
    }else{
      this.setData({show:true})
      console.log('weidengl')
    }
  },
  logout(){
    auth.logout()
    console.log('退出登录')
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  onClose(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
    this.setData({show:false})
  }
})