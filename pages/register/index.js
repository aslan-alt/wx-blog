// pages/register/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import auth from '../../utils/auth'
Page({

  data: {
    username:'',
    password:'',
    passwordAgain:"",
    loading:false
  },
  getUserName(e){
    this.setData({username:e.detail.value})
  },
  getPassWord(e){
    this.setData({password:e.detail.value})
  },
  getPassWordAgain(e){
    this.setData({passwordAgain:e.detail.value})
  },
  checkUserInput(){
    const {username,password,passwordAgain} = this.data
    if(passwordAgain!==password){
      return this.createNotice({message: '两次密码不一致哦'})
    }else if(username==="" ||password===""){
      return this.createNotice({message: '用户名或密码不能为空哦'})
    }else if(password.length < 6){
      return this.createNotice({message: '密码不能少于6位哦'})
    }else{
      this.setData({loading:true})
      auth.register({username,password}).then(res=>{
        console.log(res)
        if(res.data.status === "fail"){
          this.createNotice({ message: `${res.data.msg}哦`})
          this.setData({loading:false})
          return
        }else if(res.data.status === "ok"){
          this.createNotice({ message: res.data.msg})
          return
        }else{
          this.createNotice({ message: "网络异常"})
          return
        }
      })
    }
  },
  createNotice({message,color="red",duration=3000}){
    Notify({ message,background: '#ffff',color,duration});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})