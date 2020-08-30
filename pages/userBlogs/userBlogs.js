// pages/userBlogs/userBlogs.js
import blog from '../../utils/blog'
import {formatTime} from '../../utils/helper'

Page({
  data: {
    blogData:null,
    userInfo:null,
    wxUserInfo:null,
    blogsArray:[],
    userId:null
  },
  onLoad: function (options) {
    const userInfo = wx.getStorageSync("userInfo")
    this.setData({wxUserInfo:wx.getStorageSync("wxUserInfo")})
    this.setData({userInfo})
    this.updateBlogData(userInfo.data.data.id)
  },
  onReachBottom(){
    const currentPage = this.data.blogData.data.page
    const totalPage = this.data.blogData.data.totalPage
    if(currentPage < totalPage){
      this.updateBlogData(this.data.userInfo.data.data.id,{page:currentPage+1})
    }
  },
  edit(e){
    const {blogdata} = e.target.dataset
    console.log(blogdata)
  },
  remove(e){
    const _this = this
    const blogId = e.target.dataset.blogdata.id
    wx.showModal({
      title: '删除提示',
      content: '删除无法恢复，您确定要删除吗?',
      success (res) {
        if (res.confirm) {
          blog.deleteBlog({blogId}).then(res=>{
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
            const {blogData} = _this.data
            let removeAfterBlogs =  [...blogData.data.data].filter(item=>item.id !== blogId)
            _this.setData({blogData:{...blogData,data:{...blogData.data,data:[...removeAfterBlogs]}}}) 
          })
        }
      }
    })
  },
  updateBlogData(userId,{page=1}={page:1}){
    blog.getBlogsByUserId(userId,{page,atIndex:false}).then(res=>{
      formatTime(res.data.data)
      console.log(this.data.blogData)
      if(!this.data.blogData){
        this.setData({blogData:res})
      }else{
        // wx 的data真难用  打出的数据太丑了
        //这一行的目的是把请求来的新数据添加到原先的数据后面，
        const Obj = {blogData:{...res,data:{...res.data,data:[...this.data.blogData.data.data,...res.data.data]}}}
        console.log(Obj)
        this.setData(Obj)
      }
    })
  }
})