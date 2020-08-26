// pages/register/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import auth from '../../utils/auth'
import regeneratorRuntime from '../../utils/runtime'

Page({
  data: {
    username:'',
    password:'',
    passwordAgain:"",
    loading:false
  },
  onLoad: function () {
  
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
        if(res.data.status === "fail"){
          this.createNotice({ message: `${res.data.msg}哦`})
          this.setData({loading:false})
          return
        }else if(res.data.status === "ok"){
          this.createNotice({ message: res.data.msg,color:"#27A899"})
          wx.navigateBack({
            delta: 10
          })
          return
        }else{
          this.createNotice({ message: "网络异常"})
          return
        }
      })
    }
  },
  createNotice({message,color="red",duration=3000}){
    Notify({ message,background: 'none',color,duration});
  },
  
  /**
   * 生命周期函数--监听页面加载
   */

})