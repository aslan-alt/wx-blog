// pages/userBlogs/userBlogs.js
import blog from '../../utils/blog'
import {formatTime} from '../../utils/helper'

Page({
  data: {
    wxUserInfo:null,
    blogsArray:[],
    userId:null
  },
  onLoad: function (options) {
    const userId = wx.getStorageSync("userInfo").data.data.id
    this.setData({wxUserInfo:wx.getStorageSync("wxUserInfo")})
    this.setData({userId})
    this.updateBlogData(userId)
  },
 
  onReachBottom(){
    wx.showToast({
      title: '当前页面数据未完善',
      icon: 'success',
      duration: 2000
    })
  },
  edit(e){
    const blogId = e.target.dataset.currentblog.id

    wx.navigateTo({
      url: `/pages/edit/index?blogId=${blogId}`,
    })
  },
  remove(e){
    const _this = this
    const blogId = e.target.dataset.currentblog.id
    wx.showModal({
      title: '删除提示',
      content: '删除无法恢复，您确定要删除吗?',
      success (res) {
        if (res.confirm) {
          blog.deleteBlog({blogId}).then(res=>{
            wx.showToast({title: res.data.msg,icon: 'success',duration: 2000})
            const {blogsArray} = _this.data
            let removeAfterBlogs
            if(blogsArray.length === 1){
              _this.setData({blogsArray:[]})
              wx.showToast({title: '删除成功',icon: 'success',duration: 3000,
                success(){
                  let timeId = setTimeout(()=>{
                    wx.switchTab({url: '/pages/index/index'})
                    clearTimeout(timeId)
                  },3000)
                }
              })
            }else{
              removeAfterBlogs =  [...blogsArray].filter(item=>item.id !== blogId)
              _this.setData({blogsArray:removeAfterBlogs})
            }
          })
        }
      }
    })
  },
  updateBlogData(userId,{page=1}={page:1}){
    blog.getBlogsByUserId(userId,{page,atIndex:false}).then(res=>{
      let array = []
      if(res.data.data.length > 0 ){
        array = [...formatTime(res.data.data)]
      }
      blog.getBlogsByUserId(userId,{page,atIndex:true}).then(res=>{
        if(res.data.data.length > 0 ){
          array = [...array,...formatTime(res.data.data)]
        }
        this.setData({blogsArray:array})
      })
    })
  }
})