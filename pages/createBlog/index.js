// pages/createBlog/index.js
import blog from '../../utils/blog'
Page({
  data: {
    newBlog:{
      title:'',
      description:'',
      content:'',
      atIndex: false,
    }
  },
  onLoad: function (options) {

  },
 
  onReady: function () {
    
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
  changeAtIndex({ detail }) {
    // 需要手动对 checked 状态进行更新
    let {newBlog} = this.data
    this.setData({ newBlog:{...newBlog,atIndex:detail} });
  },
  submit(){
    const data = this.data.newBlog
    blog.createBlog(data).then(res=>{
      const blogId = res.data.data.id
      wx.showToast({title: '创建成功',icon: 'success',duration: 2000})
      let timeId = setTimeout(()=>{
        wx.navigateTo({
          url: `/pages/detail/index?blogId=${blogId}`,
        })
        clearTimeout(timeId)
      },1000)
      
    })
  },
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