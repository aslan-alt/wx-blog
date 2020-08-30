// pages/user/index.js
import auth from '../../utils/auth'
import blog from '../../utils/blog'
import Toast  from '../../miniprogram_npm/@vant/weapp/toast/toast'


const app = getApp();
Page({
  data:{
    wxUserInfo:null,
    userInfo:null,
    articleNum:0,
    show:false,
    popipStyle:"height: 20%;display:flex;justify-content: center; align-items: center;color:#27A899"
  },
  onShow(){
    this.setData({wxUserInfo:wx.getStorageSync("wxUserInfo")})
    this.setData({userInfo:wx.getStorageSync("userInfo")})
   this.loading(0)
    const {userInfo} = this.data
    let articleNum = 0
    if(userInfo.data && userInfo.data.isLogin){
      const userId = userInfo.data.data.id 
      blog.getBlogsByUserId(userId,{atIndex:false}).then(res=>{
        articleNum += res.data.total
        blog.getBlogsByUserId(userId,{atIndex:true}).then(res=>{
          articleNum += res.data.total
          this.setData({articleNum})
          this.loading(1)
        })
      })
    }else{
      this.setData({show:true})
    }
  },
  logout(){
    auth.logout()
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
    if(this.data.articleNum > 0){
      wx.navigateTo({
        url: '/pages/userBlogs/userBlogs',
      })
    }else{
      Toast({
        message:"还没有文章哦，快去创建吧",
        position:"top",
        duration:2300
      });
    }
    
  },
  loading(duration){
     Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration
    });
  },
  notice(){
    Toast({
      message:"点全部文章试试吧！\n个人信息通过微信修改哦",
      position:"top",
      duration:2300
    });
  }
})