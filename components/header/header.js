// components/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo:{
      type:Object,
      value:null
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
    }
  }
})
