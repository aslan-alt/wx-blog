// pages/detail/index.js
import blog from '../../utils/blog'
import {formatTime} from "../../utils/helper"

Page({
  data: {
    blogData:null,
    wxUserInfo:null
  },
  onLoad: function ({blogId}) {
    blog.getDetail({blogId}).then(res=>{
      const data = [JSON.parse(JSON.stringify(res.data.data))]
      formatTime(data)
      this.setData({blogData:data[0],wxUserInfo:wx.getStorageSync('wxUserInfo')})
    })
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