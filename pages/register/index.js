// pages/register/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import auth from '../../utils/auth'
import {updateUserInfo} from "../../utils/helper"
Page({
  data: {
    username: '',
    password: '',
    passwordAgain: "",
    loading: false
  },
  getUserName(e) {
    this.setData({ username: e.detail.value })
  },
  getPassWord(e) {
    this.setData({ password: e.detail.value })
  },
  getPassWordAgain(e) {
    this.setData({ passwordAgain: e.detail.value })
  },
  checkUserInput(e) {
    const { username, password, passwordAgain } = this.data
    if (passwordAgain !== password) {
      return this.createNotice({ message: '两次密码不一致哦' })
    } else if (username === "" || password === "") {
      return this.createNotice({ message: '用户名或密码不能为空哦' })
    } else if (password.length < 6) {
      return this.createNotice({ message: '密码不能少于6位哦' })
    } else {
      this.doRegister({username,password},e)
    }
  },
  doRegister({username,password}){
    this.setData({ loading: true })
    auth.register({ username, password }).then(res => {
      if (res.data.status === "fail") {
        this.createNotice({ message: `${res.data.msg}哦` })
        this.setData({ loading: false })
        return
      } else if (res.data.status === "ok") {
        this.createNotice({ message: res.data.msg })
        updateUserInfo(this)
        wx.setStorageSync("wxUserInfo",e)
        wx.navigateBack({delta: 10})
        return
      } else {
        this.createNotice({ message: "网络异常" })
      }
    })
  },
  createNotice({ message, color = "red", duration = 3000 }) {
    Notify({ message, background: '#ffff', color, duration });
  }
 
})