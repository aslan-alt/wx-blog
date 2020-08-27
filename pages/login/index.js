// pages/login/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import auth from '../../utils/auth'
import {updateUserInfo} from "../../utils/helper"

Page({
  data: {
    username: '',
    password: '',
    loading: false
  },
  getUserName(e) {
    this.setData({ username: e.detail.value })
    
  },
  getPassWord(e) {
    this.setData({ password: e.detail.value })
  },
  checkUserInput(e) {
    const { username, password } = this.data
    if (username === "" || password === "") {
      this.createNotice({ message: '用户名或密码不能为空哦' })
    } else if (password.length < 6) {
      this.createNotice({ message: '密码不能少于6位哦' })
    } else {
      this.doLogin({username,password},e)
    }
  },
  doLogin({username,password},e){
    this.setData({ loading: true })
    auth.login({ username, password }).then(res => {
      if (res.data.status === "fail") {
        this.createNotice({ message: `${res.data.msg}哦` })
        this.setData({ loading: false })
      } else if (res.data.status === "ok") {
        this.createNotice({ message: res.data.msg, color: "green" })
        updateUserInfo(this)
        wx.setStorageSync("wxUserInfo",e)
        console.log(e.detail.userInfo)
        wx.navigateBack({
          delta: 10
        })
      } else {
        this.createNotice({ message: "网络异常" })
      }
    })
  },
  createNotice({ message, color = "red", duration = 3000 }) {
    Notify({ message, background: '#ffff', color, duration });
  }
})