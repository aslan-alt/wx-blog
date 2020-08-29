// pages/user/index.js
import auth from '../../utils/auth'
import blog from '../../utils/blog'
import Toast  from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {formatTime} from '../../utils/helper'

const app = getApp();
Page({
  data:{
    wxUserInfo:null,
    userInfo:null,
    userBlog:null,
    show:false,
    popipStyle:"height: 20%;display:flex;justify-content: center; align-items: center;color:#27A899"
  },
  onShow(){
    this.setData({wxUserInfo:wx.getStorageSync("wxUserInfo")})
    this.setData({userInfo:wx.getStorageSync("userInfo")})
    const {userInfo} = this.data
    if(userInfo.data && userInfo.data.isLogin){
      blog.getBlogsByUserId(userInfo.data.data.id).then(res=>{
        formatTime(res.data.data)
        wx.setStorageSync('userBlogs',res)
        this.setData({userBlog:res})
      })
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
  },
  toUserBlogs(){
    wx.navigateTo({
      url: '/pages/userBlogs/userBlogs',
    })
  },
  notice(){
    Toast({
      message:"点全部文章试试吧！\n个人信息通过微信修改哦",
      position:"top",
      duration:2300
    });
  }
})