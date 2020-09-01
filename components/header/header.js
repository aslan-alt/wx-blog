// components/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      type:Object,
      value:null
    },
    wxUserInfo:{
      type:Object,
      value:null
    }
  },
  

 
 

  /**
   * 组件的方法列表
   */
  methods: {
    toLogin(){
      wx.navigateTo({
        url: '/pages/login/index',
      })
    },
    toRegister(){
      wx.navigateTo({
        url: '/pages/register/index',
      })
    },
    toCreate(){
      wx.navigateTo({
        url: '/pages/createBlog/index',
      })
    },
    toUser(){
      wx.switchTab({
        url: '/pages/user/index'
      })
    }
  }
})
