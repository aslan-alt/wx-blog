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
  lifetimes: {
    ready: function() {
      // 在组件实例进入页面节点树时执行
      console.log(this.properties.wxUserInfo)
      console.log(this.properties.userInfo)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toLogin(){
      wx.navigateTo({
        url: '/pages/login/index',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          console.log('ffff')
        }
      })
    },
   
    toRegister(){
      wx.navigateTo({
        url: '/pages/register/index',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          console.log('xxxxx')
        }
      })
    },
    toCreate(){
      console.log('执行了呀呀呀')
      wx.navigateTo({
        url: '/pages/createBlog/index',
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          console.log('跳转create')
        }
      })
    },
    toUser(){
      wx.switchTab({
        url: '/pages/user/index'
      })
    }
  }
})
