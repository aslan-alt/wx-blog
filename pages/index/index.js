//index.js
//获取应用实例
import auth from '../../utils/auth';
import blog from '../../utils/blog';
import {formatTime} from "../../utils/helper"
Page({
  data:{
    loading:false,
    notice:false,
    userInfo:null,
    blogData:null,
    maxPage:null,
    list:[{id:1,name:"aslan"},{id:2,name:"xxxx"}]
   
  },
  onLoad(){
    this.initData()
  },
  onReachBottom(){//到底部后触发
    const page = parseInt(this.data.blogData.data.page)+1//当前页数+1 = 下一页
    if(page!==4){//只允许请求3页
      (!this.data.loading) && this.setData({loading:true})
      this.updateBlogData({page})
    }else{
      this.setData({loading:false,notice:true})
    }
  },
  initData(){
    let userInfo = wx.getStorageSync("userInfo")
    if(userInfo === ""){
      auth.getInfo().then(res=>{
        wx.setStorageSync("userInfo",res)
        this.setData({userInfo:res,maxPage:res.data.totalPage})
      })
    }else{
      this.setData({userInfo:wx.getStorageSync("userInfo")})
    }
    this.updateBlogData()
  },
  updateBlogData({page=1}={page:1}){
    blog.getBlogs({page}).then(res=>{
      formatTime(res.data.data)
      if(!this.data.blogData){
        this.setData({blogData:res})
      }else{
        //怪就怪 wx 的data真tm难用  打出的数据太丑了
        //这一行的目的是把请求来的新数据添加到原先的数据后面，
        const Obj = {blogData:{...res,data:{...res.data,data:[...this.data.blogData.data.data,...res.data.data]}}}
        this.setData(Obj)
      }
    })
  }
})
