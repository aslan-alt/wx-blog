import blog from '../../utils/blog'
import Toast  from '../../miniprogram_npm/@vant/weapp/toast/toast'

Page({
  data: {
    newBlog:{
      title:'',
      description:'',
      content:'',
      atIndex: false,
    },
    blogId:null
  },
  onLoad({blogId}){
    this.setData({blogId})
    blog.getDetail({blogId}).then(res=>{
      const {title,description,content,atIndex} = res.data.data
      this.setData({newBlog:{title,description,content,atIndex}})
    })
  },
  changeTitle({detail}){  
    let {newBlog} = this.data
    this.setData({newBlog:{...newBlog,title:detail.value}})
  },
  changeDescription({detail}){  
    let {newBlog} = this.data
    this.setData({newBlog:{...newBlog,description:detail.value}})
  },
  changeContent({detail}){
    let {newBlog} = this.data
    this.setData({newBlog:{...newBlog,content:detail.value}})
  },
  changeAtIndex({ detail }){
    let {newBlog} = this.data
    this.setData({ newBlog:{...newBlog,atIndex:detail} });
  },
  submit(){
    const {blogId,newBlog} = this.data
    wx.showModal({
      title: '提示',
      content: '微信不支持PATCH,需后端改接口或者其他方案,这里只做展示，试试删除功能吧?',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateBack({
            delta: 1
          })          
        } else if (res.cancel) {
          console.log('用户点击取消')
          let tiemId = setTimeout(()=>{
            wx.switchTab({
              url: '/pages/index/index'
            })
            clearTimeout(tiemId)
          },1000)
        }
      }
    })
   
   
    // blog.updateBlog(blogId,newBlog).then(res=>{
    //   wx.showToast({title: '修改成功',icon: 'success',duration: 2000})
    //   let timeId = setTimeout(()=>{
    //     wx.navigateTo({
    //       url: `/pages/detail/index?blogId=${blogId}`,
    //     })
    //   },1000)
      
    // })
  },
 })